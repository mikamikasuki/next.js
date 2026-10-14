import { getOther } from '../data'

export default async function Other() {
  return <p id="other">other {await getOther()}</p>
}
