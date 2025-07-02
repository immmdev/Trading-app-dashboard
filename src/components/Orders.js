const Orders = ({ordersDetail}) => {

  return (
    <div className="orders">
      <div className="order-table">
        <table >
          <tr>
            <th style={{fontSize:"14px"}}>Instrument</th>
            <th style={{fontSize:"14px"}}>Qty.</th>
            <th style={{fontSize:"14px"}}>Avg. cost</th>
            <th style={{fontSize:"14px"}}>Tot. value</th>
          </tr>

          {ordersDetail.map((order, index) => {
            return (
              <tr key={index}>
                <td>{order.name}</td>
                <td>{order.qty}</td>
                <td>{order.price.toFixed(2)}</td>
                <td style={{fontSize:"14px"}}>{order.totalPrice.toFixed(2)}</td>
              </tr>
            )
          })}
        </table>
      </div>
    </div>

  );
};

export default Orders;




