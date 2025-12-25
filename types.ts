export interface FriendData {
  passcode: string;
  realName: string;
  note: string;
  giftImage: string;
}

export interface FriendsDataMap {
  [key: string]: FriendData;
}

// Declaration for the canvas-confetti library loaded via CDN
declare global {
  interface Window {
    confetti: any;
  }
}
