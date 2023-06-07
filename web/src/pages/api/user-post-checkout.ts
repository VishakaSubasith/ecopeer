import type { NextApiRequest, NextApiResponse } from "next";

interface gatewayRequestBody {
  PORTAL_CODE: string;
  SHOP_CODE: string;
  BANK_CODE: string;
  KESSAI_FLAG: string;
  CTRL_NO: string;
  TRAN_STAT: string;
  TRAN_REASON_CODE: string;
  TRAN_RESULT_MSG: string;
  TRAN_DATE: string;
  TRAN_TIME: string;
  CUST_NAME: string;
  CUST_FNAME: string;
  CUST_LNAME: string;
  TRAN_AMOUNT: string;
  TRAN_FEE: string;
  PAYMENT_DAY: string;
  GOODS_NAME: string;
  REMARKS_1: string;
  REMARKS_2: string;
  REMARKS_3: string;
  TRAN_ID: string;
  TRAN_DIGEST: string;
}

const useHandleCheckout = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const body: gatewayRequestBody = req.body;
    const paymentStatusCode = parseInt(body.TRAN_REASON_CODE);
    if (paymentStatusCode !== 0) {
      res.redirect(`/user/payment/payment-failed?paymentId=${body.CTRL_NO}`);
    } else {
      res.redirect(
        `/user/payment/payment-successful?paymentId=${body.CTRL_NO}`
      );
    }
  } else {
    console.log("Other route");
    res.json({ data: "other route" });
  }
};

export default useHandleCheckout;
