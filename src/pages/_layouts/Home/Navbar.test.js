import React from 'react';
import { shallow } from "enzyme";
import  Navbar from "./Navbar";
import { findByTestAttribute } from "../../../../Utils";

const setUp = (props={}) => {
  const component = shallow(<Navbar {...props}/>);
  return component;
}

describe("Sidebar Component", ()=> {
  let component;
  beforeEach(()=> {
    component = setUp();
  });

  it("Should render without errors", ()=> {
    // console.log(component.debug())
    const wrapper = findByTestAttribute(component, "sidebarComponent")
    expect(wrapper.length).toBe(1);
  });

  it("Should render four icons", () => {
    const items = component.find(".nav-menu-items li");
    expect(items.length).toBe(4);
  });

});


