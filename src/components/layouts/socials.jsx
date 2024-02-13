import styled from "styled-components"
import { RowEnd, RowStart } from "../Row"
import X_IMG from '/public/media/socials/x.svg'
import Gauge_IMG from '/public/media/socials/gauge.svg'
import Telegram_IMG from '/public/media/socials/telegram.svg'
import Image from "next/image"
import { ExternalLink } from "../Link"

const Wrap = styled(RowStart)`
    gap:8px;
    font-size: 20px;
    width: unset;
    padding-right: 10px;
`
const LinksWrap = styled(RowEnd)`
    gap:14px;
    width: unset; 
    * {
        display: flex;
    }
`


export default function Socials() {

    return <Wrap >
        <div style={{ whiteSpace: "nowrap" }}>
            JOIN SOCIALS:
        </div>
        <LinksWrap >
            <ExternalLink href="https://x.com">
                <Image src={X_IMG} />
            </ExternalLink>
            <ExternalLink href="https://x.com">
                <Image src={Gauge_IMG} />
            </ExternalLink>
            <ExternalLink href="https://x.com">
                <Image src={Telegram_IMG} />
            </ExternalLink>
        </LinksWrap>
    </Wrap>
}