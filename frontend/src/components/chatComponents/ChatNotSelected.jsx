import React from "react";

const ChatNotSelected = () => {
	return (
		<div className="h-full w-full flex flex-col justify-center items-center gap-4 pixel-grid-bg">
			<div className="text-center">
				<pre className="text-neon-green font-vt text-sm leading-tight neon-text inline-block">
{`  ██████╗██╗  ██╗ █████╗ ████████╗
 ██╔════╝██║  ██║██╔══██╗╚══██╔══╝
 ██║     ███████║███████║   ██║   
 ██║     ██╔══██║██╔══██║   ██║   
 ╚██████╗██║  ██║██║  ██║   ██║   
  ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝  `}
				</pre>
			</div>

			<div className="pixel-bounce text-5xl">💬</div>

			<div className="font-retro text-neon-cyan text-[10px] text-center neon-text-cyan px-4">
				SELECT A CHAT<br />TO START MESSAGING
			</div>

			<div className="font-vt text-neon-green/50 text-xl animate-pulse">
				— INSERT COIN —
			</div>

			<div className="flex gap-2 mt-2">
				{["▲","▼","◄","►"].map((arrow, i) => (
					<span
						key={i}
						className="w-8 h-8 flex items-center justify-center border border-neon-green/40 text-neon-green/40 font-retro text-xs"
					>
						{arrow}
					</span>
				))}
			</div>
		</div>
	);
};

export default ChatNotSelected;
