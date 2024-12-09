import { useState } from "react";
import { sendOtp, verifyOtp } from "../../services/index/users";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

const Verify = ({ token }) => {
  const [isOtpMode, setOtpMode] = useState(false);
  const [otp, setOtp] = useState("");

  const dispatch = useDispatch();

  const handleSendOtp = async () => {
    try {
      const response = await sendOtp(token);
      toast.success(response.message);
      setOtpMode(true);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await verifyOtp(otp, token);
      setOtpMode(false);
      dispatch({ type: "user/updateUserInfo", payload: { verified: true } });
      toast.success(response.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return !isOtpMode ? (
    <span
      onClick={handleSendOtp}
      className="w-full text-center italic text-primary transition-all ease-linear hover:cursor-pointer hover:text-blue-800"
    >
      verify
    </span>
  ) : (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="h-10 w-full overflow-hidden rounded-lg border border-primary px-4 py-2"
        placeholder="Enter 6 digit OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        maxLength={6}
        minLength={6}
      />
    </form>
  );
};
export default Verify;
