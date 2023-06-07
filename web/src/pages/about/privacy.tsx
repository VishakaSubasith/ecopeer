import {
  Heading,
  Text,
  Box,
  OrderedList,
  ListItem,
  VStack,
} from "@chakra-ui/react";

import MainLayout from "../../components/Layout/MainLayout";

const Privacy: React.FC = () => {
  return (
    <MainLayout>
      <VStack my={6} alignItems={"flex-start"}>
        <Heading alignSelf={"center"}>個人情報保護方針</Heading>
        <Text>
          エコピア（以下「当社」といいます。）は、個人情報の保護を重要な責務であると認識し、当社が運営するサイト「ECOPEER」やその他今後リリースするウェブサービス(以下「当サイト群」といいます。）を利用する発電所オーナーあるいは業者等の利用者（以下あわせて「利用者」といいます。）の個人情報、履歴情報及び匿名加工情報（以下「個人情報等」といいます。）その他当社が業務遂行の過程で取得した個人情報等について、以下の個人情報保護方針（以下「本個人情報保護方針」といいます。）に基づき、細心の注意を払って、取得・取扱等を行います。
        </Text>
        <Box>
          <Text>第1条　 個人情報の定義</Text>
          <Text>
            本個人情報保護方針における個人情報とは、氏名、住所等、特定の個人を識別できる情報（他の情報と容易に照合することができ、それにより特定の個人を識別することができるものを含みます。）その他の個人情報保護法第2条第1項で定義される個人情報を意味するものとします。
          </Text>
        </Box>

        <Box>
          <Text>第2条　 個人情報の利用目的</Text>
          <Text>
            当社は、取得した個人情報について、次の各号に定める目的のために利用します。
          </Text>
          <OrderedList>
            <ListItem>
              当サイト群において提供するサービス（以下「当社サービス」といいます。）の提供・管理・運営を行うために、個人情報を利用する場合
            </ListItem>
            <ListItem>
              利用者が当社サービスを利用するにあたり、当社が必要なお知らせや連絡（当社及びメンテナンス事業者を含む当社の提携先等が提供するサービス・商品等のご案内を含みます。）をしたり、サービス改善等を目的とするアンケートを依頼したり、景品等の送付をしたり、メールマガジンを送付するために、懸賞、キャンペーン等を実施したり、マーケティング調査・新規営業先の開拓を行うために、利用者の個人情報を利用する場合
            </ListItem>
            <ListItem>
              利用者が簡易にデータを入力できるようにするために、当社に登録されている利用者の個人情報を入力画面に表示させたり、利用者の指示に基づいて他のサービス等（提携先等が提供するサービス・商品を含みます。）に転送したりする場合
            </ListItem>
            <ListItem>本人確認を行うために個人情報を利用する場合</ListItem>
            <ListItem>
              利用者に代金等を請求するために個人情報を利用する場合
            </ListItem>
            <ListItem>
              代金の支払を遅滞したり、第三者に損害を発生させたりする等、「ECOPEER」の利用規約、個別規約又はガイドライン等に違反した方や、不正・不当・違法な目的で当社サービスを利用しようとする方のご利用をお断りするために、個人情報を利用する場合
            </ListItem>
            <ListItem>
              お問い合わせに対応するために、個人情報を利用する場合
            </ListItem>
            <ListItem>
              前各号の他、個人情報保護法その他の法令によって許された目的のために、個人情報を利用する場合
            </ListItem>
            <ListItem>
              個別の同意を得た目的のために、個人情報を利用する場合　
            </ListItem>
          </OrderedList>
        </Box>
        <Box>
          <Text>第3条　 個人情報の提供への同意</Text>
          <Text>
            利用者が当社サービスをご利用されるに際して、次の各号に定める場合に当社が個人情報を第三者に提供する場合があることについて、あらかじめ同意いただくものとします。
          </Text>
          <OrderedList>
            <ListItem>
              当社が当社サービスの提供を第三者に委託した場合に、利用目的の達成のために必要な範囲内で、利用者の個人情報を当該委託先に提供すること
            </ListItem>
            <ListItem>
              利用者が当社の提携先等の提供するサービスや商品の申込みをしようとする際に、氏名、住所、連絡先等当社に既に登録されている利用者の個人情報のうち申込みに必要な情報及び利用者の申込み内容を当該提携先等に提供すること
            </ListItem>
            <ListItem>
              当社の提携先等のサービス・商品等、当社以外の会社が提供するサービス・商品に関するお問い合わせを利用者から当社が受けた場合で、お問い合わせに対する回答を当該提携先等から直接行うことが適切であると当社が判断した場合、利用者のお問い合わせの内容及び利用者の連絡先に関する情報を当該提携先等に提供すること
            </ListItem>
            <ListItem>
              当社の提携先等が提供しているサービス・商品・広告を充実・改善させるためのアンケート・インタビュー等の結果を当該提携先等に提供すること
            </ListItem>
            <ListItem>
              当サイトでマッチングされた取引価格等の個人情報を、都道府県、カテゴリー別、価格帯、取引態様、時期ごとなど一定の類型ごとにまとめ分析した統計情報を、当社の提携先等に提供すること
            </ListItem>
            <ListItem>
              代金の支払を遅滞したり、第三者に損害を発生させたりする等、「ECOPEER」の利用規約、個別規約又はガイドラインに違反した方や、不正・不当・違法な目的で当社サービスを利用しようとする方のご利用をお断りするために、当該個人を特定するために個人情報を当社の提携先等に提供すること
            </ListItem>
            <ListItem>
              外部の第三者が運営するクラウドサーバ（外国にあるサーバを含みます）に個人情報を保管その他取り扱うことを委託するために提供すること
            </ListItem>
            <ListItem>
              当社サービスの利用に関連して、利用者が法令に違反した疑いがあると認めた公的機関から、利用者と直接連絡をとるために必要な情報の開示の求めがあった場合において、当該求めに応じることが適切であると当社が判断したときに、利用者の連絡先に関する情報を当該公的機関に提供すること
            </ListItem>
            <ListItem>
              利用者が未成年者である場合に法定代理人から開示の要請があった場合、又は、利用者が成年被後見人である場合に成年後見人から開示の要請があった場合に、必要な利用者の個人情報を法定代理人又は成年後見人に提供すること
            </ListItem>
          </OrderedList>
        </Box>
        <Box>
          <Text>第4条 　個人情報の第三者への提供</Text>
          <Text>
            当社は、あらかじめ同意を頂いた場合以外についても、次の各号に定める場合には、個人情報を第三者に提供する場合があります。
          </Text>
          <OrderedList>
            <ListItem>
              裁判所から、法令に基づく開示を命じる判決・決定・命令等を受けた場合、又は捜査機関等の公的機関から法令に基づく照会等を受けた場合
            </ListItem>
            <ListItem>
              人の生命、身体、財産の保護のために必要がある場合であって、本人同意を得ることが困難な場合
            </ListItem>
            <ListItem>
              その他、個人情報保護法その他の法令に基づき許される場合
            </ListItem>
          </OrderedList>
        </Box>

        <Box>
          <Text>第5条　 履歴情報</Text>
          <OrderedList>
            <ListItem>
              本個人情報保護方針における履歴情報とは、「ECOPEER」その他の当社サイトへの訪問者が閲覧した「ECOPEER」のページや、Webページの閲覧履歴、広告の履歴、検索キーワード、利用時間帯、利用環境、IPアドレス、cookie情報、携帯端末の個体識別情報及び位置情報をいうものとします。
            </ListItem>
            <ListItem>
              <Text>
                当社は、次の各号に定める目的で、履歴情報を利用することがあります。
              </Text>
              <OrderedList>
                <ListItem>
                  「ECOPEER」サイトの利用者数やトラフィックの調査、マーケティング・市場調査
                </ListItem>
                <ListItem>
                  当社サービスの改善や新サービス・新商品の企画開発
                </ListItem>
                <ListItem>
                  趣味・趣向に最適な広告（当社及び当社の提携先等が提供するサービス・商品等に関する広告）の表示及び配信
                </ListItem>
              </OrderedList>
            </ListItem>
            <ListItem>
              当社が広告の表示及び配信を委託している会社や、「ECOPEER」上で広告を表示している会社が、cookie情報、匿名ID・広告識別子（以下「cookie情報等」といいます。）を設定している場合があります。
              この場合、当該会社が、cookie情報等を取得します。当該会社が取得したcookie情報等は、当該会社のプライバシーポリシーに従って取り扱われます。
              行動履歴の取得を希望されない場合は、各検索サイトページ等より行動履歴の収集を中止する手続きを行ってください。
            </ListItem>
          </OrderedList>
        </Box>
        <Box>
          <Text>第6条　 匿名加工情報</Text>
          <OrderedList>
            <ListItem>
              当社は、個人情報保護委員会規則で定める基準に従い特定の個人を識別できないように個人情報を加工することにより得られる個人に関する情報であって、当該個人情報を復元することができないようにしたもの（以下「匿名加工情報」といいます。）を、次項に定める目的のために利用します。
              なお、現在は、当社が作成する匿名加工情報はありません。
            </ListItem>
            <ListItem>
              <Text>
                当社は、次の各号に定める目的で、匿名加工情報を利用します。
              </Text>
              <OrderedList>
                <ListItem>マーケティング調査及び分析</ListItem>
                <ListItem>
                  経営分析のための統計情報の作成及び分析結果の利用
                </ListItem>
                <ListItem>サービス、商品等の企画開発及び提供</ListItem>
                <ListItem>
                  当社及び他社のサービス、商品及びキャンペーンのご案内
                </ListItem>
                <ListItem>
                  当社及び他社の広告及びアンケートの配信及び表示
                </ListItem>
                <ListItem>その他、当社が有益と判断した情報の提供</ListItem>
              </OrderedList>
            </ListItem>
            <ListItem>
              <Text>
                当社は、次の各号に定める場合には、匿名加工情報を第三者に提供する場合があります。
              </Text>
              <OrderedList>
                <ListItem>当社サービスの提供を第三者に委託する場合</ListItem>
                <ListItem>
                  災害対策、地域振興等の公共目的に使用する場合
                </ListItem>
                <ListItem>
                  当社の提携先等のサービス、商品等の企画開発及び提供、並びに当社の提携先等の広告、アンケート等の配信及び表示、その他当社が利用者に有益と判断した情報提供を行う場合
                </ListItem>
                <ListItem>
                  当社が行ったマーケティングの調査結果及び市場調査の結果等を他社に提供する場合
                </ListItem>
                <ListItem>
                  その他、個人情報保護法その他の法令に基づき許される場合
                </ListItem>
              </OrderedList>
            </ListItem>
          </OrderedList>
        </Box>

        <Box>
          <Text>第7条　 個人情報の開示</Text>
          <OrderedList>
            <ListItem>
              当社は、個人情報保護法の定めに基づき個人情報の開示を請求されたときは、ご本人からの開示の請求であることを本人確認書類等に基づき確認した上で、遅滞なく開示を行います（当該個人情報が存在しないときにはその旨を通知します。）。
              ただし、個人情報保護法その他の法令により、当社が開示の義務を負わない場合は、開示を行いませんが、その旨を通知します。
            </ListItem>
            <ListItem>
              開示の手続にあたっては、当社所定の手数料をご負担いただくものとします。
            </ListItem>
          </OrderedList>
        </Box>
        <Box>
          <Text>
            第8条　 個人情報の訂正、追加、削除、利用停止、第三者への提供停止
          </Text>
          <OrderedList>
            <ListItem>
              当社は、個人情報の訂正、追加若しくは削除又は利用停止、消去若しくは第三者への提供の停止（以下あわせて「訂正等」といいます。）の請求があった場合には、ご本人からの訂正等の求めであることを本人確認書類等に基づき確認した上で、遅滞なく調査を行います。
              この場合において、当該訂正等の請求にかかる個人情報の内容が事実でない場合その他当該個人情報の取扱が適正でないと認められる場合には、当社は、遅滞なく訂正等を行います。
              ただし、当社は、訂正等の請求があった場合においても、個人情報保護法その他の法令に基づき、当該訂正等の請求にかかる個人情報の全部又は一部について、訂正等を行わない場合があります。
              訂正等を行わない場合、当社はその旨を通知します。
            </ListItem>
            <ListItem>
              訂正等の手続にあたっては、当社は手数料を頂きません。
            </ListItem>
          </OrderedList>
        </Box>

        <Box>
          <Text>第9条　 従業員及び委託先の監督について</Text>
          <OrderedList>
            <ListItem>
              当社は、個人情報及び匿名加工情報の適正な取扱の確保のため、従業員に対して、事業規模に応じ可能な限り必要な教育研修を実施します。　
            </ListItem>
            <ListItem>
              当社が当社サービスの提供を第三者に委託する場合、当社は、個人情報及び匿名加工情報を適正に取り扱うと認められる委託先を選定し、委託先との契約において、安全管理措置、秘密保持その他の個人情報及び匿名加工情報の取扱に関する事項について適正に定め、事業規模に応じ可能な限り必要かつ適正な監督を行うものとします。
            </ListItem>
          </OrderedList>
        </Box>

        <Box>
          <Text>第10条　 本個人情報保護方針の変更について</Text>
          <Text>
            当社では、本個人情報保護方針の変更を行う際は、当社所定のホームページの変更をもって公表するものとします。変更後の本個人情報保護方針は、変更後の本個人情報保護方針に記載された施行日から効力を生じるものとします。
          </Text>
        </Box>
        <Box>
          <Text>第11条　 個人情報の取扱に関する相談窓口</Text>
          <Text>
            当社の個人情報の取扱につきまして、開示若しくは訂正等のご請求、ご意見、ご要望又はお問い合わせ等がございましたら、下記の相談窓口までご連絡頂けますようお願い申し上げます。
            メールアドレス：info@ecopeer.co.jp （2022年6月30日制定・施行）
          </Text>
        </Box>
      </VStack>
    </MainLayout>
  );
};

export default Privacy;