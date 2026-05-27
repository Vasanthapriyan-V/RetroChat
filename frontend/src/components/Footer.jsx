import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<div className="w-full bg-black border-t-2 border-neon-green px-6 py-6" style={{ boxShadow: "0 -4px 0 #39ff14" }}>
			<div className="flex flex-wrap gap-8 mb-4">
				<div className="flex flex-col gap-1 min-w-[160px]">
					<span className="font-retro text-neon-green text-[9px] mb-2 neon-pulse">// PAGES</span>
					{[["/", "CHAT APP"], ["/signin", "SIGN IN"], ["/signup", "SIGN UP"]].map(([to, label]) => (
						<Link key={to} to={to} className="font-vt text-neon-green/60 text-base hover:neon-text transition-all">&gt; {label}</Link>
					))}
				</div>
			</div>
			<div className="border-t border-neon-green/20 pt-3 flex items-center justify-between flex-wrap gap-2">
				<span className="font-retro text-neon-green/30 text-[8px]">© 2024 RETROCHAT — ALL RIGHTS RESERVED</span>
				<span className="font-vt text-neon-green/30 text-sm animate-pulse">INSERT COIN TO CONTINUE ▶</span>
			</div>
		</div>
	);
};

export default Footer;
