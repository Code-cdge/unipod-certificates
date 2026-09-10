'use client'

import Image from "next/image";
import UnipodLogo from '@/../public/assets/images/Unipod-Logo.png'
import { JSX } from 'react'

type Props = {
  height?: number
  width?: number
}
export default function Logo(props: Props): JSX.Element {
  return <Image src={UnipodLogo} placeholder={'blur'} alt={'UniPod Logo'} {...props} />
}