import { ArrowForwardIcon, AttachmentIcon } from "@chakra-ui/icons";
import {
  Flex,
  Box,
  Wrap,
  Textarea,
  Text,
  IconButton,
  Input,
  Spinner,
  Button,
  HStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import Channel from "../components/Chat/Channel";
import Message from "../components/Chat/Message";
import MainLayout from "../components/Layout/MainLayout";
import {
  MessagesQuery,
  useMarkChannelAsReadMutation,
} from "../generated/graphql";
import {
  useChannelsQuery,
  useMeQuery,
  useMessagesQuery,
  useNewMessageSubscription,
  useSendMessageMutation,
  useUploadFileMutation,
} from "../generated/graphql";

const Chat: React.FC = () => {
  const router = useRouter();
  const initialChannel = router.query?.channelId
    ? parseInt(router.query?.channelId as any)
    : -1;

  console.log("initial channel", initialChannel);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // States
  const [activeChannel, setActiveChannel] = useState<number>(-1);
  const [currentMessage, setCurrentMessage] = useState("");
  const [currentConversation, setCurrentConversation] =
    useState<MessagesQuery["messages"]>();

  // Queries
  const [{ data: userData }] = useMeQuery();
  console.log("userData====>>>",userData)
  const [{ data: channelData, fetching: channelFetching }, getChannels] =
    useChannelsQuery({
      requestPolicy: "network-only",
    });
  const [{ data: messagesData, fetching: messagesFetching }] = useMessagesQuery(
    {
      variables: { channelId: activeChannel },
      pause: activeChannel === -1,
      requestPolicy: "network-only",
    }
  );

  // Mutations
  const [, sendMessage] = useSendMessageMutation();
  const [, uploadFile] = useUploadFileMutation();
  const [, markChannelAsRead] = useMarkChannelAsReadMutation();

  // Subscriptions
  const [{ data: newMessagesData }] = useNewMessageSubscription({
    variables: { channelId: activeChannel },
    pause: activeChannel === -1,
  });

  // Effects
  useEffect(() => {
    setActiveChannel(initialChannel);
  }, [initialChannel]);

  useEffect(() => {
    const messages = messagesData?.messages;
    setCurrentConversation(messages);
  }, [messagesData]);

  useEffect(() => {
    if (currentConversation && newMessagesData) {
      const newMessage = newMessagesData.newMessage;
      setCurrentConversation([...currentConversation, newMessage]);
      getChannels();
    }
  }, [newMessagesData]);

  useEffect(() => {
    if (messagesEndRef) {
      messagesEndRef?.current?.addEventListener(
        "DOMNodeInserted",
        (event: { currentTarget: any }) => {
          const { currentTarget: target } = event;
          target.scroll({ top: target.scrollHeight, behavior: "smooth" });
        }
      );
    }
  }, [newMessagesData, messagesData]);

  // Event Handlers
  const channelClickHandler = async (channelId: number) => {
    setActiveChannel(channelId);
    await markChannelAsRead({ input: { channelId } });
    getChannels();
  };

  const sendMessageHandler = () => {
    if (currentMessage.trim()) {
      sendMessage({ channelId: activeChannel, content: currentMessage });
    }
    setCurrentMessage("");
  };

  const inputFileRef = useRef<HTMLInputElement>(null);

  const uploadOnClickHandler = () => {
    inputFileRef.current?.click();
  };

  const messageInputOnClickHandler = async () => {
    await markChannelAsRead({ input: { channelId: activeChannel } });
    getChannels();
  };

  return (
    <MainLayout varient={"pure"} showSidebar>
      <Flex flexDirection={"row"} h={"85vh"}>
        <Box flex={"6"} borderRight={"1px"} borderColor={"gray.500"}>
          {activeChannel < 0 ? (
            <Flex
              alignItems={"center"}
              justifyContent={"center"}
              height={"100%"}
            >
              <Text
              // pos={"absolute"}
              // left={"50%"}
              // top={"50%"}
              >
                仕事Noなどを確認の上チャットしてください。
              </Text>
            </Flex>
          ) : (
            <Flex
              p={5}
              h={"100%"}
              direction={"column"}
              justifyContent={"space-between"}
              // position={"relative"}
            >
              {messagesFetching ? (
                <Spinner />
              ) : (
                <Box
                  ref={messagesEndRef}
                  overflowY={"scroll"}
                  height={"100%"}
                  pr={3}
                >
                  {currentConversation?.map((message) => (
                    <Message
                      key={message.id}
                      sender={message.senderId === userData?.me?.id}
                      content={message.content}
                      uploadedFile={message.uploadedFile}
                      timestamp={new Date(parseInt(message.createdAt))}
                    />
                  ))}
                </Box>
              )}
              <HStack
                alignItems={"center"}
                justifyContent={"space-between"}
                mt={5}
              >
                <Textarea
                  h={1}
                  placeholder={"メッセージを入力してください"}
                  resize={"none"}
                  value={currentMessage}
                  onClick={messageInputOnClickHandler}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                />

                <Input
                  display={"none"}
                  ref={inputFileRef}
                  border={"none"}
                  flex={"2"}
                  accept="image/*"
                  type="file"
                  placeholder={"Upload File"}
                  minWidth={"180px"}
                  onChange={async (event) => {
                    event.target.files;
                    const cfiles = event.target.files;
                    if (cfiles) {
                      const fileInfo = cfiles[0];
                      await uploadFile({
                        uploadFileInput: fileInfo,
                        channelId: activeChannel,
                      });
                      setCurrentMessage("");
                    }
                  }}
                />

                <IconButton
                  minWidth={"60px"}
                  onClick={uploadOnClickHandler}
                  variant="outline"
                  aria-label="Upload"
                  icon={<AttachmentIcon />}
                />
                <Button
                  variant={"outline"}
                  onClick={sendMessageHandler}
                  rightIcon={<ArrowForwardIcon />}
                >
                  送信
                </Button>
              </HStack>
            </Flex>
          )}
        </Box>
        <Box flex={"2"}>
          <Box p={10}>
            <Wrap direction={"column"}>
              {channelData?.channels.channelsExtraInfo.map((channelInfo) => (
                  channelInfo.channel.deleted !== true ?
                <Channel
                  key={channelInfo.channel.id}
                  channelId={channelInfo.channel.id}
                  receiver={channelInfo.channel.channelsMembers.find(
                    (member) => member.user.id !== userData?.me?.id
                  )}
                  channelClickHandler={channelClickHandler}
                  isActive={channelInfo.channel.id == activeChannel}
                  unReadCount={channelInfo.unReadCount}
                />
                      :""

              ))}
            </Wrap>
          </Box>
        </Box>
        {/* <Box flex={"2"}>
          <Box p={10}></Box>
        </Box> */}
      </Flex>
    </MainLayout>
  );
};

export default Chat;
