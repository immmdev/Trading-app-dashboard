
import { Tooltip, Grow } from "@mui/material";
import {
    BarChartOutlined,
    MoreHoriz
} from "@mui/icons-material";

const WatchListActions = ({handleClickBuy,handleClickSell,onClickHandleStats }) => {
    return (
        <div style={{ position: "sticky" }} className="actions d-flex justify-content-center">
            <div className="d-flex" >
                <span>
                    <Tooltip title="Buy (B)" placement="top" arrow TransitionComponent={Grow}>
                        <button onClick={handleClickBuy} className="buy">Buy</button>
                    </Tooltip>
                </span>

                <span>
                    <Tooltip title="Sell (S)" placement="top" arrow TransitionComponent={Grow}>
                        <button onClick={handleClickSell} className="sell">Sell</button>
                    </Tooltip>

                </span>

                <span>
                    <Tooltip title="Analytics (A)"  placement="top" arrow TransitionComponent={Grow}>
                        <button className="action" onClick={onClickHandleStats}>
                            <BarChartOutlined className="icon" />
                        </button>
                    </Tooltip>
                </span>

                <span>
                    <Tooltip title="More" placement="top" arrow TransitionComponent={Grow}>
                        <button className="action">
                            <MoreHoriz className="icon" />
                        </button>
                    </Tooltip>
                </span>

            </div>
        </div>
    );
};

export default WatchListActions;
