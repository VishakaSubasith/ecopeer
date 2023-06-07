export class BjpUtils {
  getCardToken = (
    portalCode: any,
    shopCode: any,
    cardNo: any,
    cardExpirydate: any,
    tokenDatetime: any,
    callback: any
  ) => {
    fetch("https://www.e5.billingjapan.co.jp/NASApp/bjp/get-card-token", {
      method: "POST",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({
        PORTAL_CODE: portalCode,
        SHOP_CODE: shopCode,
        CARD_NO: cardNo,
        CARD_EXPIRYDATE: cardExpirydate,
        TOKEN_DATETIME: tokenDatetime,
      }),
    });
  };
}
