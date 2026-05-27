import React, { useEffect } from "react";
import { FaPenAlt } from "react-icons/fa";
import { addMyChat, addSelectedChat } from "../../redux/slices/myChatSlice";
import { useDispatch, useSelector } from "react-redux";
import { setChatLoading, setGroupChatBox } from "../../redux/slices/conditionSlice";
import ChatShimmer from "../loading/ChatShimmer";
import getChatName, { getChatImage } from "../../utils/getChatName";
import { VscCheckAll } from "react-icons/vsc";
import { SimpleDateAndTime, SimpleTime } from "../../utils/formateDateTime";

const MyChat = () => {
	const dispatch = useDispatch();
	const myChat = useSelector((store) => store.myChat.chat);
	const authUserId = useSelector((store) => store?.auth?._id);
	const selectedChat = useSelector((store) => store?.myChat?.selectedChat);
	const isChatLoading = useSelector((store) => store?.condition?.isChatLoading);
	const newMessageId = useSelector((store) => store?.message?.newMessageId);
	const isGroupChatId = useSelector((store) => store.condition.isGroupChatId);

	useEffect(() => {
		const getMyChat = () => {
			dispatch(setChatLoading(true));
			const token = localStorage.getItem("token");
			fetch(`${import.meta.env.VITE_BACKEND_URL}/api/chat`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			})
				.then((res) => res.json())
				.then((json) => {
					dispatch(addMyChat(json?.data || []));
					dispatch(setChatLoading(false));
				})
				.catch((err) => {
					console.log(err);
					dispatch(setChatLoading(false));
				});
		};
		getMyChat();
	}, [newMessageId, isGroupChatId]);

	return (
		<>
			{/* Panel header */}
			<div className="px-4 py-3 flex justify-between items-center bg-black border-b-2 border-neon-green">
				<h1 className="font-retro text-neon-green text-[10px] neon-pulse">MY CHATS</h1>
				<div
					className="flex items-center gap-2 border border-neon-cyan px-2 py-1 cursor-pointer hover:bg-neon-cyan/10 transition-all"
					style={{ boxShadow: "2px 2px 0 #00fff5" }}
					title="Create New Group"
					onClick={() => dispatch(setGroupChatBox())}
				>
					<span className="font-vt text-neon-cyan text-base">NEW GROUP</span>
					<FaPenAlt className="text-neon-cyan" fontSize={12} />
				</div>
			</div>

			{/* Chat list */}
			<div className="flex flex-col w-full px-2 gap-1 py-2 overflow-y-auto scroll-style h-[73vh]">
				{myChat.length === 0 && isChatLoading ? (
					<ChatShimmer />
				) : (
					<>
						{myChat?.length === 0 && (
							<div className="w-full h-full flex flex-col justify-center items-center gap-3 text-neon-green/50">
								<span className="text-3xl">📭</span>
								<span className="font-vt text-lg">NO TRANSMISSIONS</span>
								<span className="font-vt text-sm text-neon-green/30">START A NEW CONVERSATION</span>
							</div>
						)}
						{myChat?.map((chat) => {
							const isSelected = selectedChat?._id === chat?._id;
							return (
								<div
									key={chat?._id}
									className={`w-full border-2 flex items-center p-2 gap-2 cursor-pointer transition-all ${
										isSelected
											? "chat-selected border-neon-green"
											: "border-neon-green/20 hover:border-neon-green/60 hover:bg-neon-green/5"
									}`}
									onClick={() => dispatch(addSelectedChat(chat))}
								>
									<img
										className="h-10 w-10 object-cover flex-shrink-0"
										style={{ imageRendering: "pixelated", border: isSelected ? "2px solid #39ff14" : "2px solid #1a2a1a" }}
										src={getChatImage(chat, authUserId)}
										alt="avatar"
									/>
									<div className="w-full min-w-0">
										<div className="flex justify-between items-center">
											<span className={`font-vt text-lg capitalize line-clamp-1 ${isSelected ? "neon-text" : "text-neon-green/80"}`}>
												{getChatName(chat, authUserId)}
											</span>
											<span className="font-vt text-neon-green/40 text-sm ml-1 flex-shrink-0">
												{chat?.latestMessage && SimpleTime(chat?.latestMessage?.createdAt)}
											</span>
										</div>
										<div className="font-vt text-sm text-neon-green/40 line-clamp-1">
											{chat?.latestMessage ? (
												<div className="flex items-center gap-1">
													{chat?.latestMessage?.sender?._id === authUserId && (
														<VscCheckAll className="text-neon-cyan flex-shrink-0" fontSize={13} />
													)}
													<span className="line-clamp-1">{chat?.latestMessage?.message}</span>
												</div>
											) : (
												<span>{SimpleDateAndTime(chat?.createdAt)}</span>
											)}
										</div>
									</div>
								</div>
							);
						})}
					</>
				)}
			</div>
		</>
	);
};

export default MyChat;
