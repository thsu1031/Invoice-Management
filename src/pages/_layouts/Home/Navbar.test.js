import React from 'react';
import { shallow } from "enzyme";
import  Navbar from "./Navbar";
import { findByTestAttribute } from "../../../../Utils";
import { fireEvent } from '@testing-library/react';

const setUp = (props={}) => {
  const component = shallow(<Navbar {...props}/>);
  return component;
}

describe("<Navbar>", ()=> {
  let component;
  beforeEach(()=> {
    component = setUp();
  });

  it("Should render without errors", async ()=> {
    // console.log(component.debug())
    const wrapper = findByTestAttribute(component, "sidebarComponent")
    expect(wrapper.length).toBe(1);
  });

  it("Should render four icons", () => {
    const items = component.find(".nav-menu-items li");
    expect(items.length).toBe(4);
  });

  // it("Should check hover item color", async()=> {
  //   const item = component.find(".nav-menu-items li");
  //   fireEvent.mouseOver(item);
  //   expect(await item).toHaveStyle(`color:#0074d9`)

  // })

});


