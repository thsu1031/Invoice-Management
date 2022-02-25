import {render, screen} from "../../../test-utils/testing-library-utils";
import Home  from "./index";
const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", ()=> ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: ()=>  mockedUsedNavigate,
}));


describe("<Home />", ()=> {
  test("Should render Home component without crashing", ()=> {
    render(<Home />);
    const HomeComponent = screen.getByTestId("Home-test");
    expect(HomeComponent).toBeInTheDocument()
  });

})



