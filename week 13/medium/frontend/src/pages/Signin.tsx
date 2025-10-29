import { SigninAuth } from "../components/SigninAuth";
import { Quote } from "../components/Quote";

export const Signin = () => {
    return (
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div>
              <SigninAuth />
            </div>
            <div className="invisible lg:visible">
              <Quote />
            </div>
          </div>
        </div>
      );
}
