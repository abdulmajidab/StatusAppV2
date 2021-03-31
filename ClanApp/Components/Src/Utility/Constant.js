export default (contants = {
    API: {
        SERVER_URL: "http://182.70.125.37:3000/api",
        SOCKET_URL: "http://182.70.125.37:3000/",
        SIGN_USER: '/users/createUser',
        USER_LIST: '/users/userList',
        CHAT_LIST: '/chat/chatList',
        CHAT_ROOM: '/room/chatRoom',
        UPDATE_USER: '/users/updateUser',
        VERIFY_USER: '/users/verifyUser',
        GET_UNREAD_CHAT: '/chat/getUnreadMessage',
        CREATE_CHAT_ROOM: '/room/createChatRoom',
        UPDATE_CHAT_ROOM: '/room/updateChatRoom',
        LAST_SEEN: '/room/lastSeen',
        CREATE_USER_STATUS: '/status/createStatus',
        GET_ALL_STATUS: '/status/getAllStatus',
        SET_STATUS_VIEWED: '/status/statusViewed',
        RESEND_OTP:'/users/ressendNumber',
    },
    USERNAME:'USERNAME',
    USER_ID:'USER_ID',
    ACCESS_TOKEN:'AccessToken',
    TIME_FORMAT:'hh:mm A',
    DATE_TIME_FORMAT:'DD MMM YYYY hh:mm A',
    FRIEND:'FRIEND',
    OWNER:'OWNER',
    CHAT_ROOM:'CHAT_ROOM',
    CHAT_LIST:'CHAT_LIST',
    LAST_SEEN:'LAST_SEEN',
    SCAN_QR_CODE:'SCAN_QR_CODE',
    USER_STATUS:'USER_STATUS',

    JOIN_CHAT:'JOIN_CHAT',
    ADD_STREAM:'ADD_STREAM',
    MY_STREAM:'MY_STREAM',
    ADD_REMOTE_STREAM:'ADD_REMOTE_STREAM',
    ADDM_MY_PEERID:'ADDM_MY_PEERID',


})