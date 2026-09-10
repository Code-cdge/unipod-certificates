'use client'

import Image from "next/image";
import AppIcon from '@/../public/assets/images/icon.png'
import { JSX } from 'react'

type Props = {
  height?: number
  width?: number
}
export default function Icon(props: Props): JSX.Element {
  return <Image src={AppIcon} alt={'UniPod Icon'} {...props} />
}