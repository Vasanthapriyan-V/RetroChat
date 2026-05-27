import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addAuth } from "../redux/slices/authSlice";
import { checkValidSignInFrom } from "../utils/validate";
import { PiEye, PiEyeClosedLight } from "react-icons/pi";

const SignIn = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [load, setLoad] = useState("");
	const [isShow, setIsShow] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const logInUser = (e) => {
		toast.loading("AUTHENTICATING...");
		e.target.disabled = true;
		fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/signin`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, password }),
		})
			.then((r) => r.json())
			.then((json) => {
				setLoad("");
				e.target.disabled = false;
				toast.dismiss();
				if (json.token) {
					localStorage.setItem("token", json.token);
					dispatch(addAuth(json.data));
					navigate("/");
					toast.success(json?.message);
				} else {
					toast.error(json?.message);
				}
			})
			.catch((error) => {
				setLoad("");
				toast.dismiss();
				toast.error("ERROR: " + error.code);
				e.target.disabled = false;
			});
	};

	const handleLogin = (e) => {
		if (email && password) {
			const validError = checkValidSignInFrom(email, password);
			if (validError) { toast.error(validError); return; }
			setLoad("LOADING...");
			logInUser(e);
		} else {
			toast.error("ALL FIELDS REQUIRED");
		}
	};

	return (
		<div className="min-h-[80vh] flex flex-col items-center justify-center pixel-grid-bg py-10 px-4">
			{/* Terminal window */}
			<div className="w-full max-w-md retro-panel">
				{/* Title bar */}
				<div className="flex items-center gap-2 px-4 py-2 border-b-2 border-neon-green bg-black">
					<span className="w-3 h-3 bg-neon-pink inline-block" style={{ boxShadow: "0 0 6px #ff2d78" }}></span>
					<span className="w-3 h-3 bg-neon-yellow inline-block" style={{ boxShadow: "0 0 6px #ffe600" }}></span>
					<span className="w-3 h-3 bg-neon-green inline-block" style={{ boxShadow: "0 0 6px #39ff14" }}></span>
					<span className="font-retro text-neon-green text-[9px] ml-2 neon-pulse">RETROCHAT.EXE</span>
				</div>

				<div className="p-6">
					{/* ASCII logo */}
					<div className="text-center mb-6">
						<pre className="text-neon-green font-vt text-base leading-tight neon-text inline-block">
{`██████╗ ███████╗████████╗██████╗  ██████╗ 
██╔══██╗██╔════╝╚══██╔══╝██╔══██╗██╔═══██╗
██████╔╝█████╗     ██║   ██████╔╝██║   ██║
██╔══██╗██╔══╝     ██║   ██╔══██╗██║   ██║
██║  ██║███████╗   ██║   ██║  ██║╚██████╔╝
╚═╝  ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝`}
						</pre>
					</div>

					<p className="font-vt text-neon-cyan text-xl mb-6 neon-text-cyan">
						<span className="text-neon-green">$</span> SIGN_IN --user
						<span className="blink-cursor"></span>
					</p>

					<form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
						<div>
							<label className="font-vt text-neon-green text-lg block mb-1">
								&gt; EMAIL_ADDRESS:
							</label>
							<input
								className="retro-input"
								type="email"
								placeholder="user@domain.com"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>

						<div>
							<label className="font-vt text-neon-green text-lg block mb-1">
								&gt; PASSWORD:
							</label>
							<div className="relative">
								<input
									className="retro-input pr-12"
									type={isShow ? "text" : "password"}
									placeholder="••••••••"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
								<span
									onClick={() => setIsShow(!isShow)}
									className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-neon-green"
								>
									{isShow ? <PiEyeClosedLight fontSize={20} /> : <PiEye fontSize={20} />}
								</span>
							</div>
						</div>

						<button
							onClick={(e) => { e.preventDefault(); handleLogin(e); }}
							className="retro-btn w-full mt-2 text-[10px]"
						>
							{load === "" ? "▶ ENTER SYSTEM" : "▶ " + load}
						</button>

						<div className="flex items-center gap-2 mt-2">
							<div className="flex-1 h-px bg-neon-green/20"></div>
							<Link to={"#"}>
								<span className="font-vt text-neon-yellow text-base hover:neon-text-yellow px-2">
									FORGOT PASSWORD?
								</span>
							</Link>
							<div className="flex-1 h-px bg-neon-green/20"></div>
						</div>

						<div className="flex items-center gap-2">
							<div className="flex-1 h-px bg-neon-green/20"></div>
							<Link to="/signup">
								<span className="font-vt text-neon-cyan text-base hover:neon-text-cyan px-2">
									NEW PLAYER? SIGN UP
								</span>
							</Link>
							<div className="flex-1 h-px bg-neon-green/20"></div>
						</div>
					</form>
				</div>
			</div>

			<p className="font-vt text-neon-green/30 text-sm mt-4">
				© RETROCHAT 2024 — INSERT COIN TO CONTINUE
			</p>
		</div>
	);
};

export default SignIn;
