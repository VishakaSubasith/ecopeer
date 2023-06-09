import { Heading, Text, VStack } from "@chakra-ui/react";
import MainLayout from "../../components/Layout/MainLayout";

const Disclaimer: React.FC = () => {
  return (
    <MainLayout>
      <VStack mt={6} justifyContent={"flex-start"} alignItems={"flex-start"}>
        <Heading alignSelf={"center"} mb={6}>
          免責事項
        </Heading>
        <Text>
          エコピア（以下、「当社」という）は、当サイト「ＥＣＯＰＥＥＲ」（以下、「当サイト」という）を、最大限の注意を払い運営しておりますが、情報の正確性、有用性、確実性、適合性、適法性、最新性、安全性、継続性（機能が中断しないこと、エラーが発生しないこと、欠点を修正すること、当サイトに関連しコンピューターウィルスその他の有害物がないこと等）、第三者の権利を侵害しないこと等について、当社および当社に関連する会社、当社と取引する会社（以下、「当社等」という）は一切の保証を与えるものではありません。
        </Text>
        <Text>
          当社等は予告なしに当サイト上の情報を変更することがあります。同様に、予告なしに当サイトの運営を中断または中止させていただくことがあります。特に、令和4年7月のサービスリリースより1年あまりはサービス改善重点期間として、当サイトのアップデートを繰り返すため、当サイトの運営の中断が頻発する恐れがありますことをご了承の上、ご利用頂きたく存じます。その際、ＥＣＯＰＥＥＲの利用者が当サイトに含まれる情報もしくはサービスを利用する事、および利用することができなかったことを含め、理由の如何に関わらず、当サイトの利用者に生じる直接的または間接的な損失に対し、当社等は一切の責任を負うものではありません。
        </Text>
        <Text>
          また、当サイトの利用者において、当社の規定する禁止事項が確認された場合、利用者ＩＤ・パスワードの利用停止、削除等の措置がとられることがあります。その際、利用者のいかなる損失についても、当社等は一切の責任を負いません。
        </Text>
        <Text>
          当サイトからリンクしている他のＷＥＢサイトに含まれている情報、サービス等については、当社等は一切関知しておらず、一切の責任を負いません。
        </Text>
        <Text>
          通信回線やコンピューター、ハッキング等の障害によるシステムの中断、遅延、中止、データの消失、データへの不正アクセスにより生じた損害、その他サービスのご利用に関して利用者に生じた損害について、当社などは一切の責任を負いません。
        </Text>
        <Text>
          当サイトをご利用される場合は、以上のことをご理解、ご承諾させたものとさせていただきますので、何卒よろしくお願いいたします。
        </Text>
      </VStack>
    </MainLayout>
  );
};

export default Disclaimer;
