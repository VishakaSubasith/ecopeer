import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import React from "react";
import MainLayout from "../../../components/Layout/MainLayout";
import InstructionStep from "../../../components/InstructionStep";

interface howToUseProps {}

const howToUse: React.FC<howToUseProps> = ({}) => {
  const instructions = [
    {
      section: "【発電所オーナー　様】",
      steps: [
        {
          title: "（１）発電所オーナーとして会員登録する（現在登録無料）",
          text: [],
        },
        {
          title: "（２）My発電所を登録する",
          text: [
            "　　「設備認定IDから探して新規登録」ボタンより、設備認定ＩＤで検索し、ＭＹ発電所として登録する",
            "　　各発電所の編集画面より、任意の発電所名や発電所の詳細の場所（マップ上のピンを動かす）を確定させる",
          ],
        },
        {
          title: "（３）仕事を公募し依頼する",
          text: [
            "　　My仕事の「新しい仕事を登録する」ボタンより、仕事を②登録、③公募、④仮払、⑤仕事完了連絡待ち、⑥⑦相互評価、最終的に⑧完了",
            "　　となるように仕事ステータスを進める",
            "　　必要に応じ、チャットで業者さんとやり取りする",
          ],
        },
      ],
    },
    {
      section: "【業者　様】",
      steps: [
        { title: "（１）業者として会員登録する（現在登録無料）", text: [] },
        {
          title: "（２）発電所オーナーが公募している仕事を受注する",
          text: [
            "　　トップページ等から探し、応募し受注し仕事を行い、仕事ステータスが⑥完了となるように進める",
            "　　必要に応じ、チャットで発電所オーナーとやり取りする",
          ],
        },
        {
          title:
            "（３）仕事を完了させ発電所オーナーへ報告する",
          text: [
            "　　仕事完了後、相互評価を経て⑥完了ステータスとなれば、月1回まとめてエコピアより報酬(※)が振り込まれる",
            "　　（※エコピアよりマッチング金額から１０％の手数料控除後の代金が支払われる）",
          ],
        },
      ],
    },
  ];
  return (
    <MainLayout>
      <Box mt={10}>
        {instructions.map((instruction, index) => (
          <InstructionStep
            key={index}
            section={instruction.section}
            steps={instruction.steps}
          />
        ))}
      </Box>
    </MainLayout>
  );
};

export default howToUse;
