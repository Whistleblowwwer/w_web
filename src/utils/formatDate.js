import { differenceInMilliseconds, differenceInHours, differenceInDays, differenceInMonths, parseISO } from 'date-fns'

const formatDate = (createdAt) => {
  const parsedDate = parseISO(createdAt)
  const currentDate = new Date()

  const millisecondsDifference = differenceInMilliseconds(currentDate, parsedDate)
  const secondsDifference = Math.floor(millisecondsDifference / 1000)
  const minutesDifference = Math.floor(secondsDifference / 60)
  const hoursDifference = differenceInHours(currentDate, parsedDate)
  const daysDifference = differenceInDays(currentDate, parsedDate)
  const monthsDifference = differenceInMonths(currentDate, parsedDate)

  if (minutesDifference < 1) {
    return `${secondsDifference}s`
  } else if (hoursDifference < 1) {
    return `${minutesDifference}m`
  } else if (hoursDifference < 24) {
    return `${hoursDifference}h`
  } else if (daysDifference < 30) {
    return `${daysDifference}d`
  } else {
    return `${monthsDifference}m`
  }
}

export default formatDate
