export const notifications = [
  {
    id: 1,
    title: "Your order is placed",
    role: "Frontend Developer",
    desc: "Amet minim mollit non deser unt ullamco est sit aliqua.",
    avatar: "01.png",
    status: "online",
    unread_message: false,
    type: "text",
    date: "2 days ago",
  },
  {
    id: 2,
    title: "Congratulations Darlene 🎉",
    role: "UI/UX Designer",
    desc: "Won the monthly best seller badge",
    avatar: "02.png",
    status: "online",
    unread_message: true,
    type: "text",
    date: "11 am",
  },
]

export type Notification = (typeof notifications)[number]
