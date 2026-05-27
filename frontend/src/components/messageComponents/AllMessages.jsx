import React, { Fragment, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { VscCheckAll } from "react-icons/vsc";
import { CgChevronDoubleDown } from "react-icons/cg";
import {
    SimpleDateAndTime,
    SimpleDateMonthDay,
    SimpleTime,
} from "../../utils/formateDateTime";

const AllMessages = ({ allMessage }) => {
    const chatBox = useRef();
    const adminId = useSelector((store) => store.auth?._id);
    const isTyping = useSelector((store) => store?.condition?.isTyping);

    const [scrollShow, setScrollShow] = useState(true);
    // Handle Chat Box Scroll Down
    const handleScrollDownChat = () => {
        if (chatBox.current) {
            chatBox.current.scrollTo({
                top: chatBox.current.scrollHeight,
                // behavior: "auto",
            });
        }
    };
    // Scroll Button Hidden
    useEffect(() => {
        handleScrollDownChat();
        if (chatBox.current.scrollHeight == chatBox.current.clientHeight) {
            setScrollShow(false);
        }
        const handleScroll = () => {
            const currentScrollPos = chatBox.current.scrollTop;
            if (
                currentScrollPos + chatBox.current.clientHeight <
                chatBox.current.scrollHeight - 30
            ) {
                setScrollShow(true);
            } else {
                setScrollShow(false);
            }
        };
        const chatBoxCurrent = chatBox.current;
        chatBoxCurrent.addEventListener("scroll", handleScroll);
        return () => {
            chatBoxCurrent.removeEventListener("scroll", handleScroll);
        };
    }, [allMessage, isTyping]);

    return (
        <>
            {scrollShow && (
                <div
                    className="absolute bottom-16 right-4 cursor-pointer z-20 pixel-border w-8 h-8 flex items-center justify-center text-neon-green hover:bg-neon-green/10"
                    onClick={handleScrollDownChat}
                >
                    <CgChevronDoubleDown title="Scroll Down" fontSize={18} />
                </div>
            )}
            <div
                className="flex flex-col w-full px-3 gap-1 py-2 overflow-y-auto overflow-hidden scroll-style h-[66vh]"
                ref={chatBox}
            >
                {allMessage?.map((message, idx) => {
                    return (
                        <Fragment key={message._id}>
                            <div className="sticky top-0 flex w-full justify-center z-10">
                                {new Date(
                                    allMessage[idx - 1]?.updatedAt
                                ).toDateString() !==
                                    new Date(
                                        message?.updatedAt
                                    ).toDateString() && (
                                    <span className="font-vt text-xs mb-2 mt-1 text-neon-green/50 bg-black border border-neon-green/30 h-7 w-fit px-4 flex items-center justify-center">
                                        {SimpleDateMonthDay(message?.updatedAt)}
                                    </span>
                                )}
                            </div>
                            <div
                                className={`flex items-start gap-1 ${
                                    message?.sender?._id === adminId
                                        ? "flex-row-reverse"
                                        : "flex-row"
                                }`}
                            >
                                {message?.chat?.isGroupChat &&
                                    message?.sender?._id !== adminId &&
                                    (allMessage[idx + 1]?.sender?._id !==
                                    message?.sender?._id ? (
                                        <img
                                            src={message?.sender?.image}
                                            alt=""
                                            className="h-8 w-8 object-cover flex-shrink-0"
                                            style={{ imageRendering: "pixelated", border: "2px solid #00fff5" }}
                                        />
                                    ) : (
                                        <div className="h-8 w-8 flex-shrink-0"></div>
                                    ))}
                                <div
                                    className={`${
                                        message?.sender?._id === adminId
                                            ? "msg-sent"
                                            : "msg-recv"
                                    } py-1.5 px-2 min-w-10 text-start flex flex-col relative max-w-[85%]`}
                                >
                                    {message?.chat?.isGroupChat &&
                                        message?.sender?._id !== adminId && (
                                            <span className="font-retro text-[8px] text-neon-cyan mb-1">
                                                {message?.sender?.firstName.toUpperCase()}
                                            </span>
                                        )}
                                    <div
                                        className={`mt-1 pb-1.5 font-vt text-lg ${
                                            message?.sender?._id == adminId
                                                ? "pr-16"
                                                : "pr-12"
                                        }`}
                                    >
                                        <span>{message?.message}</span>
                                        <span
                                            className="font-vt text-[11px] absolute bottom-1 right-2 flex items-end gap-1 opacity-60"
                                            title={SimpleDateAndTime(message?.updatedAt)}
                                        >
                                            {SimpleTime(message?.updatedAt)}
                                            {message?.sender?._id === adminId && (
                                                <VscCheckAll className="text-neon-cyan" fontSize={13} />
                                            )}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Fragment>
                    );
                })}
                {isTyping && (
                    <div id="typing-animation">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                )}
            </div>
        </>
    );
};

export default AllMessages;
