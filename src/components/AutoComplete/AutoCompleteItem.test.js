import React from "react";
import { shallow } from "enzyme";
import AutoCompleteItem from "./AutoCompleteItem";

describe("AutoComplete Item Component", () => {
  it("simulate update customer onclick", () => {
    const name = "Test_Name";
    const onSelectItem = jest.fn();
    const mOnSelect = jest.fn();
    const mHideSuggestion = jest.fn();
    const mSetSearch = jest.fn();
    const mCustomerNameSelect = jest.fn();
    const wrapper = shallow(
      <AutoCompleteItem
        name={name}
        onSelectItem={() => {
          mHideSuggestion();
          mSetSearch();
          mOnSelect(name);
          mCustomerNameSelect(name);
        }}
        inHighlighted={undefined}
      />
    );
    const item = wrapper.find(".list-group-item");
    item.simulate("click");
    expect(mOnSelect).toBeCalledWith(name);
    expect(mCustomerNameSelect).toBeCalledWith(name);
  });
});
