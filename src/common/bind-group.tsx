import { h, Component } from "preact";

export interface BindGroupChange {
  name: string,
  value: any
}

export default class BindGroup extends Component<any, any> {

  private static bindAttrName = "data-bind";
  private static bindAttrEvent = "data-event";
  private static watchHandlerAttrName = "watch";

  private static createChangeReport = (child: JSX.Element, { target }) => {
    // checkbox
    const change = { name: child.attributes[BindGroup.bindAttrName], value: target.value };
    if (target.nodeName === "INPUT" && target.getAttribute("type") === "checkbox") {
      change.value = target.checked;
    }
    return change;
  }

  private static mapChildren = (child: JSX.Element, cbk: Function) => {
    if (child.attributes instanceof Object && child.attributes[BindGroup.bindAttrName]) {
      child.attributes = { [child.attributes[BindGroup.bindAttrEvent] || 'onChange']: (evt: Event) => cbk.call(null, BindGroup.createChangeReport(child, evt), evt), name: child.attributes[BindGroup.bindAttrName], ...child.attributes }
    } else if (child.children instanceof Array && child.children.length) {
      child.children = child.children.map(child => BindGroup.mapChildren(child, cbk));
    }
    return child;
  };

  private onPropertyChange(change, evt) {
    if (this.props instanceof Object && typeof this.props[BindGroup.watchHandlerAttrName] === "function") {
      this.props[BindGroup.watchHandlerAttrName].call(null, change, evt);
    }
  }

  private transformChildren(children: JSX.Element[]): JSX.Element[] {
    return children.map(child => BindGroup.mapChildren(child, this.onPropertyChange.bind(this)));
  }

  public render({ children }) {
    return (
      <div>
        {this.transformChildren(children)}
      </div>
    )
  }
}
