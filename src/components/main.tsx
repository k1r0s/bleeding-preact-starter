import { h, Component } from "preact";
import { Link, renderOnRoute, RouterOutlet } from "preact-routlet"
import connect from "../common/connect";
import BindGroup from "preact-bind-group";
import { updateForm } from "../store";
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

renderOnRoute("/profile")(connect({ updateForm })(({ profile, updateForm }) => (
  <div>
    <h1>welcome {profile.name} {profile.birth && `born in ${profile.birth}`}</h1>
    change your info: <br/>
    <form>
      <BindGroup watch={updateForm}>
        <div>
          <input data-bind="name" data-event="onKeyUp"/>
        </div>
        <div>
          <input data-bind="birth" type="date"/>
        </div>
      </BindGroup>
    </form>
  </div>
)))

interface RouteListenerParams {
  params: {
    [key: string]: string
  }
}

@renderOnRoute("/route/:routeId")
class RouteListener extends Component<RouteListenerParams, any> {
  render() {
    return <h5>this is route {this.props.params.routeId}</h5>
  }
}

class NavBar extends Component<any, any> {

  state = {
    allowed: false
  }

  componentDidMount() {
    this.fetchPermissions();
  }

  @http({ url: '/perms.json' })
  fetchPermissions(params?, err?, result?) {
    this.setState({ allowed: !err && result.allowed })
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
        <Link href="/route/1">route 1</Link>
        <Link href="/route/2">route 2</Link>
        <Link href="/route/3">route 3</Link>
      </nav>
    )
  }

}
