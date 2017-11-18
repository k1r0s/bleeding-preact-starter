import { h, Component } from "preact";
import { Link, renderOnRoute, RouterOutlet } from "preact-routlet"
import connect from "../common/connect";
import { setProfileName } from "../store";
import { Provider } from "redux-zero/preact";
import appStore from "../store";
import { stylesheet } from "stylesheet-decorator";
import { http } from "http-decorator";

export default _ => (
  <Provider store={appStore}>
    <div>
      <NavBar/>
      <RouterOutlet>
        not found :(
      </RouterOutlet>
    </div>
  </Provider>
)

renderOnRoute("/")(_ => (
  <h1>Hallo</h1>
))

renderOnRoute("/profile")(connect({ setProfileName })(({ profile, setProfileName }) => (
  <div>
    <h1>welcome {profile.name}</h1>
    change your name: <br/>
    <input onKeyUp={setProfileName}/>
  </div>
)))

class NavBar extends Component<any, any> {

  state = {
    allowed: 0
  }

  componentDidMount() {
    this.fetchPermissions();
  }

  @http({ url: '/perms.json' })
  fetchPermissions(params?, err?, result?) {
    this.setState({ allowed: err ? 0 : result.allowed })
  }

  @stylesheet(`
      a { padding: 5px; text-decoration: none; }
    `)
  render() {
    return (
      <nav>
        <Link href="/">Home</Link>
        <Link href="/1111111">404</Link>
        { this.state.allowed && <Link href="/profile">Profile</Link> }
      </nav>
    )
  }

}
