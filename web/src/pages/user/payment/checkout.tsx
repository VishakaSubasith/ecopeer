import { Box, Button, Checkbox, Heading, HStack, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import MainLayout from "../../../components/Layout/MainLayout";
import { useInitializeUserTransactionMutation } from "../../../generated/graphql";

interface checkoutProps {}

const Checkout: React.FC<checkoutProps> = () => {
  const [{ data }, initializePyament] = useInitializeUserTransactionMutation();
  const PAYMENT_ENDPOINT =
    "https://www.e5.billingjapan.co.jp/NASApp/bjp/PB71SelectBankServlet";

  const PORTAL_CODE = "000230";
  const SHOP_CODE = "1256201056";
  // const INVALID_RETURN_URL = "http://127.0.0.1:3000/api/user-post-checkout";
  // const VALID_RETURN_URL = "http://127.0.0.1:3000/api/user-post-checkout";
  // const INVALID_RETURN_URL = "http://127.0.0.1:3000/user/payment/payment-failed";
  // const VALID_RETURN_URL = "http://127.0.0.1:3000/user/payment/payment-passed";
  const INVALID_RETURN_URL = "https://ecopeer.net/api/user-post-checkout";
  const VALID_RETURN_URL = "https://ecopeer.net/api/user-post-checkout";
  const KESSAI_FLAG = "CA";
  const BANK_CODE = "CA05";

  const [paymentId, setPaymentID] = useState<string>();
  const checkboxHandler = async () => {
    const trans = await initializePyament({
      paymentId: "MX" + Math.round(Math.random() * 1000000000),
    });
    console.log(trans);
    setPaymentID(trans.data?.initializeUserTransaction.transactionId);
  };
  return (
    <MainLayout>
      <Box
        shadow={"lg"}
        px={[10, 30]}
        py={[5, 10]}
        my={[5, 20]}
        rounded={"lg"}
        maxWidth={["xs", "xl"]}
        mx={"auto"}
      >
        <form
          action="https://www.e5.billingjapan.co.jp/NASApp/bjp/PB71SelectBankServlet"
          method="POST"
          id="f"
        >
          <Heading>{"毎月のシステムご利用料金"}</Heading>
          <input name="PORTAL_CODE" value={PORTAL_CODE} type="hidden" />
          <input name="SHOP_CODE" value={SHOP_CODE} type="hidden" />
          <input name="KESSAI_FLAG" value={KESSAI_FLAG} type="hidden" />
          <input
            name="CTRL_NO"
            onChange={(e) => setPaymentID(e.target.value)}
            value={paymentId}
            type="hidden"
          />
          <input
            name="INVALID_RETURN_URL"
            value={INVALID_RETURN_URL}
            type="hidden"
          />
          <input
            name="VALID_RETURN_URL"
            value={VALID_RETURN_URL}
            type="hidden"
          />
          <input name="BANK_CODE" value={BANK_CODE} type="hidden" />
          <input name="TRAN_AMOUNT" value={"2000"} type="hidden" />
          <HStack>
            <Text>無料期間：</Text>
            <Text>
              3ヶ月以内（※3か月以内でのご解約の場合は、料金は発生いたしません）
            </Text>
          </HStack>
          <HStack>
            <Checkbox onChange={checkboxHandler} />
            <Text>利用規約に同意する</Text>
          </HStack>
          <Button type="submit">お支払い手続きに進む</Button>
        </form>
      </Box>
    </MainLayout>
  );
};

export default Checkout;
