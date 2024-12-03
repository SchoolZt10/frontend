interface IComment {
  id: string
  comment: string
  createdAt: string
  timestamp: string
  user: {
    name: string
  }
}