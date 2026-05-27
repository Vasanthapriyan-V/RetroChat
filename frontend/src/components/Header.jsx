import React, { useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addAuth } from "../redux/slices/authSlice";
import handleScrollTop from "../utils/handleScrollTop";
import {
	MdKeyboardArrowDown,
	MdKeyboardArrowUp,
	MdNotificationsActive,
} from "react-icons/md";
import {
	setHeaderMenu,
	setLoading,
	setNotificationBox,
	setProfileDetail,
} from "../redux/slices/conditionSlice";
import { IoLogOutOutline } from "react-icons/io5";
import { PiUserCircleLight } from "react-icons/pi";

const Header = () => {
	const user = useSelector((store) => store.auth);
	const isHeaderMenu = useSelector((store) => store?.condition?.isHeaderMenu);
	const newMessageRecieved = useSelector(
		(store) => store?.myChat?.newMessageRecieved
	);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const token = localStorage.getItem("token");

	const getAuthUser = (token) => {
		dispatch(setLoading(true));
		fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/profile`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		})
			.then((res) => res.json())
			.then((json) => {
				dispatch(addAuth(json.data));
				dispatch(setLoading(false));
			})
			.catch((err) => {
				console.log(err);
				dispatch(setLoading(false));
			});
	};

	useEffect(() => {
		if (token) {
			getAuthUser(token);
			navigate("/");
		} else {
			navigate("/signin");
		}
		dispatch(setHeaderMenu(false));
	}, [token]);

	const { pathname } = useLocation();
	useEffect(() => {
		if (user) {
			navigate("/");
		} else if (pathname !== "/signin" && pathname !== "/signup") {
			navigate("/signin");
		}
		handleScrollTop();
	}, [pathname, user]);

	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
		navigate("/signin");
	};

	useEffect(() => {
		var prevScrollPos = window.pageYOffset;
		const handleScroll = () => {
			var currentScrollPos = window.pageYOffset;
			if (prevScrollPos < currentScrollPos && currentScrollPos > 80) {
				document.getElementById("header").classList.add("hiddenbox");
			} else {
				document.getElementById("header").classList.remove("hiddenbox");
			}
			prevScrollPos = currentScrollPos;
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const headerMenuBox = useRef(null);
	const headerUserBox = useRef(null);
	const handleClickOutside = (event) => {
		if (
			headerMenuBox.current &&
			!headerUserBox?.current?.contains(event.target) &&
			!headerMenuBox.current.contains(event.target)
		) {
			dispatch(setHeaderMenu(false));
		}
	};
	useEffect(() => {
		if (isHeaderMenu) {
			document.addEventListener("mousedown", handleClickOutside);
		} else {
			document.removeEventListener("mousedown", handleClickOutside);
		}
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [isHeaderMenu]);

	return (
		<>
			{/* Marquee ticker below header */}
			<div className="w-full h-6 bg-black border-b border-neon-green/30 marquee-track fixed top-16 md:top-20 z-40">
				<span className="marquee-content text-neon-green/60 text-xs font-vt tracking-widest">
					★ RETROCHAT v1.0 ★ &nbsp;&nbsp; WELCOME PLAYER &nbsp;&nbsp; ★ CONNECT · CHAT · CONQUER ★ &nbsp;&nbsp; INSERT COIN TO CONTINUE &nbsp;&nbsp; ★ HIGH SCORE: 999999 ★ &nbsp;&nbsp;
				</span>
			</div>

			<div
				id="header"
				className="w-full h-16 fixed top-0 z-50 md:h-20 flex justify-between items-center px-4 font-retro bg-crt-bg border-b-2 border-neon-green transition-all"
				style={{ boxShadow: "0 0 20px rgba(57,255,20,0.3), 0 4px 0 #39ff14" }}
			>
				{/* Logo */}
				<div className="flex items-center gap-3">
					<Link to={"/"} className="flex items-center gap-3">
						<div className="relative w-10 h-10 flex items-center justify-center pixel-border">
							<span className="text-neon-green text-xl neon-pulse">💬</span>
						</div>
						<span
							className="text-neon-green font-retro text-xs md:text-sm neon-pulse hidden sm:block"
							style={{ letterSpacing: "2px" }}
						>
							RETROCHAT
						</span>
					</Link>
				</div>

				{/* Right side */}
				{user ? (
					<div className="flex flex-nowrap items-center gap-3">
						{/* Notification bell */}
						<span
							className={`relative cursor-pointer flex items-center justify-center ${
								newMessageRecieved.length > 0 ? "pixel-bounce" : ""
							}`}
							title={`${newMessageRecieved.length} new notifications`}
							onClick={() => dispatch(setNotificationBox(true))}
						>
							<MdNotificationsActive
								fontSize={22}
								className="text-neon-yellow"
								style={{ filter: "drop-shadow(0 0 6px #ffe600)" }}
							/>
							{newMessageRecieved.length > 0 && (
								<span className="retro-badge absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center text-[8px]">
									{newMessageRecieved.length}
								</span>
							)}
						</span>

						{/* Username */}
						<span className="text-neon-cyan font-vt text-lg hidden sm:block neon-text-cyan">
							{user.firstName.toUpperCase()}_
						</span>

						{/* Avatar dropdown */}
						<div
							ref={headerUserBox}
							onClick={(e) => {
								e.preventDefault();
								dispatch(setHeaderMenu(!isHeaderMenu));
							}}
							className="flex items-center gap-1 cursor-pointer pixel-border p-0.5"
						>
							<img
								src={user.image}
								alt="avatar"
								className="w-8 h-8 object-cover"
								style={{ imageRendering: "pixelated" }}
							/>
							<span className="text-neon-green">
								{isHeaderMenu ? (
									<MdKeyboardArrowDown fontSize={16} />
								) : (
									<MdKeyboardArrowUp fontSize={16} />
								)}
							</span>
						</div>

						{/* Dropdown menu */}
						{isHeaderMenu && (
							<div
								ref={headerMenuBox}
								className="absolute top-16 md:top-20 right-4 z-40 retro-panel w-44 py-2 flex flex-col gap-1"
							>
								<div
									onClick={() => {
										dispatch(setHeaderMenu(false));
										dispatch(setProfileDetail());
									}}
									className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-neon-green/10 text-neon-green font-vt text-lg border-b border-neon-green/20"
								>
									<PiUserCircleLight fontSize={20} />
									<span>PROFILE</span>
								</div>
								<div
									className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-neon-pink/10 text-neon-pink font-vt text-lg"
									onClick={handleLogout}
									style={{ color: "#ff2d78", textShadow: "0 0 6px #ff2d78" }}
								>
									<IoLogOutOutline fontSize={20} />
									<span>LOGOUT</span>
								</div>
							</div>
						)}
					</div>
				) : (
					<Link to={"/signin"}>
						<button className="retro-btn text-[9px]">SIGN IN</button>
					</Link>
				)}
			</div>
		</>
	);
};

export default Header;
