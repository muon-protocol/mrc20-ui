import styled from "styled-components"
import { RowCenter } from "../Row"

const Wrap = styled(RowCenter)`
    color: #FC0;
    font-size: 56px;
    font-weight: 400;
    border-radius: 8px;
    border: 2px solid #FC0;
    background: #000;
    padding: 0px 20px;
    height: 68px;
    margin-bottom: 20px;
`

export function GunPortal() {
    return <Wrap>
        <div>
            THE $GUN PORTAL
        </div>
    </Wrap>
}