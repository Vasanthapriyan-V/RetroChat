import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { checkValidSignUpFrom } from "../utils/validate";
import { PiEye, PiEyeClosedLight } from "react-icons/pi";

const SignUp = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [load, setLoad] = useState("");
	const [isShow, setIsShow] = useState(false);
	const navigate = useNavigate();

	const signUpUser = (e) => {
		toast.loading("CREATING PLAYER...");
		e.target.disabled = true;
		fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ firstName, lastName, email, password }),
		})
			.then((r) => r.json())
			.then((json) => {
				setLoad("");
				e.target.disabled = false;
				toast.dismiss();
				if (json.token) {
					navigate("/signin");
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

	const handleSignup = (e) => {
		if (firstName && lastName && email && password) {
			const validError = checkValidSignUpFrom(firstName, lastName, email, password);
			if (validError) { toast.error(validError); return; }
			setLoad("LOADING...");
			signUpUser(e);
		} else {
			toast.error("ALL FIELDS REQUIRED");
		}
	};

	return (
		<div className="min-h-[80vh] flex flex-col items-center justify-center pixel-grid-bg py-10 px-4">
			<div className="w-full max-w-md retro-panel">
				{/* Title bar */}
				<div className="flex items-center gap-2 px-4 py-2 border-b-2 border-neon-green bg-black">
					<span className="w-3 h-3 bg-neon-pink inline-block" style={{ boxShadow: "0 0 6px #ff2d78" }}></span>
					<span className="w-3 h-3 bg-neon-yellow inline-block" style={{ boxShadow: "0 0 6px #ffe600" }}></span>
					<span className="w-3 h-3 bg-neon-green inline-block" style={{ boxShadow: "0 0 6px #39ff14" }}></span>
					<span className="font-retro text-neon-green text-[9px] ml-2 neon-pulse">NEW_PLAYER.EXE</span>
				</div>

				<div className="p-6">
					<div className="text-center mb-6">
						<div className="font-retro text-neon-pink text-sm neon-text-pink mb-1">★ NEW PLAYER ★</div>
						<div className="font-vt text-neon-green text-2xl neon-text">REGISTER YOUR CALLSIGN</div>
					</div>

					<p className="font-vt text-neon-cyan text-xl mb-4 neon-text-cyan">
						<span className="text-neon-green">$</span> CREATE_ACCOUNT --new
						<span className="blink-cursor"></span>
					</p>

					<form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
						<div className="flex gap-3">
							<div className="flex-1">
								<label className="font-vt text-neon-green text-base block mb-1">&gt; FIRST NAME:</label>
								<input
									className="retro-input"
									type="text"
									placeholder="JOHN"
									value={firstName}
									onChange={(e) => setFirstName(e.target.value)}
									required
								/>
							</div>
							<div className="flex-1">
								<label className="font-vt text-neon-green text-base block mb-1">&gt; LAST NAME:</label>
								<input
									className="retro-input"
									type="text"
									placeholder="DOE"
									value={lastName}
									onChange={(e) => setLastName(e.target.value)}
									required
								/>
							</div>
						</div>

						<div>
							<label className="font-vt text-neon-green text-base block mb-1">&gt; EMAIL:</label>
							<input
								className="retro-input"
								type="email"
								placeholder="user@domain.com"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</div>

						<div>
							<label className="font-vt text-neon-green text-base block mb-1">&gt; PASSWORD:</label>
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
							onClick={(e) => { handleSignup(e); e.preventDefault(); }}
							className="retro-btn w-full mt-2 text-[10px]"
						>
							{load === "" ? "▶ CREATE PLAYER" : "▶ " + load}
						</button>

						<div className="flex items-center gap-2 mt-1">
							<div className="flex-1 h-px bg-neon-green/20"></div>
							<Link to="/signin">
								<span className="font-vt text-neon-cyan text-base hover:neon-text-cyan px-2">
									ALREADY A PLAYER? SIGN IN
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

export default SignUp;
