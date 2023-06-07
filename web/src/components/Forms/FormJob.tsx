import React from "react";
import {
  Box,
  Heading,
  Flex,
  Checkbox,
  Button,
  Text,
  HStack,
  Spacer,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import SelectInputField from "../Core/Input/SelectInputField";
import InputField from "../Core/InputField";
import InputTextArea from "../Core/Input/InputTextArea";
import InputFile from "../Core/Input/InputFile";

interface ErrorFields {
  title?: string;
  category?: string;
  shortDescription?: string;
  longDescription?: string;
  location?: string;
  solarPowerPlantId?: string;
  budget?: string;
  applicationDeadline?: string;
  startDate?: string;
  endDate?: string;
  status?: string;
  jobImage1?: string;
  jobImage2?: string;
  jobImage3?: string;
  jobImage4?: string;
}
interface FormJobProps {
  initialFormValues: any;
  submitHandler: any;
  powerPlantOptions: any;
}

const FormJob: React.FC<FormJobProps> = ({
  initialFormValues,
  submitHandler,
  powerPlantOptions,
}) => {
  return (
    <Box
      shadow={"lg"}
      px={[10, 30]}
      py={[5, 10]}
      my={[5, 20]}
      rounded={"lg"}
      maxWidth={["xs", "4xl"]}
      mx={"auto"}
    >
      <HStack>
        <Heading>仕事を登録する</Heading>
        <Spacer />
        <Text color={"red.600"}>※は入力必須項目</Text>
      </HStack>
      <Formik
        initialValues={initialFormValues}
        validate={(values) => {
          const errors: ErrorFields = {};

          // if (
          //   !values.jobImage1 &&
          //   !values.jobImage2 &&
          //   !values.jobImage3 &&
          //   !values.jobImage4
          // ) {
          //   errors.jobImage1 =
          //     errors.jobImage2 =
          //     errors.jobImage3 =
          //     errors.jobImage4 =
          //       "Please select at least one image";
          // }

          if (!values.title) {
            errors.title = "必須";
          }
          if (!values.category.value) {
            errors.category = "必須";
          }
          if (!values.shortDescription) {
            errors.shortDescription = "必須";
          }
          if (!values.longDescription) {
            errors.longDescription = "必須";
          }
          if (!values.location) {
            errors.location = "必須";
          }
          if (!values.budget) {
            errors.budget = "必須";
          }
          if (!values.applicationDeadline) {
            errors.applicationDeadline = "必須";
          }
          if (!values.startDate) {
            errors.startDate = "必須";
          }
          if (!values.endDate) {
            errors.endDate = "必須";
          }

          if (!values.solarPowerPlantId.value) {
            errors.solarPowerPlantId =
              "仕事発生場所の発電所の設備認定IDを選んでください";
          }

          if (values.budget < 3000) {
            errors.budget = "3,000円以上を入力してください";
          }
          if (values.title.length > 14) {
            errors.title = "文字数制限は14です";
          }
          if (values.location.length > 14) {
            errors.location = "文字数制限は14です";
          }
          const currentDate = new Date();
          const enteredDate = new Date(values.applicationDeadline);
          currentDate.setDate(currentDate.getDate() + 7);
          if (enteredDate < currentDate) {
            errors.applicationDeadline = "申請締切日は本日から1週間です";
          }
          return errors;
        }}
        onSubmit={submitHandler}
      >
        {({ isSubmitting, values, setFieldValue, errors }) => (
          <Form>
            <InputField
              name="title"
              placeholder="仕事のタイトル"
              label="仕事のタイトル"
              helperText="（14文字までで記入）"
              helperTextColor="red.600"
              required
            />
            <SelectInputField
              name="category"
              label="仕事のカテゴリを選択する"
              // optionValues={[

              //   { label: "草刈・除草剤", value: "草刈・除草剤" },
              //   { label: "パネル洗浄", value: "パネル洗浄" },
              //   { label: "防草シート", value: "防草シート" },
              //   { label: "ｸﾞﾗﾝﾄﾞｶﾊﾞｰﾌﾟﾗﾝﾂ", value: "ｸﾞﾗﾝﾄﾞｶﾊﾞｰﾌﾟﾗﾝﾂ" },
              //   { label: "フェンス", value: "フェンス" },
              //   { label: "看板", value: "看板" },
              //   { label: "保険", value: "保険" },
              //   { label: "1日お手伝い", value: "1日お手伝い" },
              //   { label: "防犯カメラ", value: "防犯カメラ" },
              //   { label: "その他電気仕事", value: "その他電気仕事" },
              // ]}
              optionValues={[
                {
                  label: "発電所を守る",
                  options: [
                    {
                      label: "草刈・除草剤・防草シート",
                      value: "草刈・除草剤・防草シート",
                    },
                    {
                      label: "パネル洗浄・スポット診断",
                      value: "パネル洗浄・スポット診断",
                    },
                    {
                      label: "故障・復旧・電気工事",
                      value: "故障・復旧・電気工事",
                    },
                    {
                      label: "フェンス・看板・防犯カメラ",
                      value: "フェンス・看板・防犯カメラ",
                    },
                    {
                      label: "保険・売却相談",
                      value: "保険・売却相談",
                    },
                    {
                      label: "税務申告・定期報告",
                      value: "税務申告・定期報告",
                    },
                    {
                      label: "一日アルバイト・その他",
                      value: "一日アルバイト・その他",
                    },
                  ],
                },
                {
                  label: "発電所を作る",
                  options: [
                    {
                      label: "造成・埋立・舗装・雨水対策",
                      value: "造成・埋立・舗装・雨水対策",
                    },
                    {
                      label: "設置・電気工事",
                      value: "設置・電気工事",
                    },
                    {
                      label: "パネル・部材",
                      value: "パネル・部材",
                    },
                    {
                      label: "農地転用・融資相談・その他",
                      value: "農地転用・融資相談・その他",
                    },
                  ],
                },
              ]}
              placeholder="仕事のカテゴリを選択する"
              required
            />
            <InputField
              name="shortDescription"
              placeholder="仕事の簡単な説明"
              label="仕事の簡単な説明"
              required
            />
            <InputTextArea
              name="longDescription"
              label="仕事の詳細な説明"
              helperText="（業者様が見積しやすい様、情報をお書きください）"
              helperTextColor="red.600"
              required
            />
            <Text>特記事項</Text>
            
            <Flex
              direction={"row"}
              wrap={"wrap"}
              justifyContent={"space-evenly"}
            >
              <Checkbox>急募</Checkbox>
              <Checkbox>未経験可</Checkbox>
              <Checkbox>初心者歓迎</Checkbox>
              <Checkbox>立ち会いなし</Checkbox>
              <Checkbox>機械必要</Checkbox>
            </Flex>
            <InputField
              name="location"
              placeholder="仕事場所の住所"
              label="仕事場所の住所"
              helperText="（例：〇〇県△△市　※字名以降は任意で記入してください・14文字までで記入）"
              helperTextColor="red.600"
              required
            />
            <SelectInputField
              name="solarPowerPlantId"
              label="My発電所から設備認定IDを選択する"
              optionValues={powerPlantOptions}
              placeholder="My発電所から設備認定IDを選択する"
              required
            />
            <InputField
              type="number"
              name="budget"
              placeholder="希望予算"
              label="希望予算"
              required
            />
            <Text fontSize={14} my={2}>
              ※4つまで画像を挿入できます
            </Text>
            <HStack alignItems={"baseline"} justifyContent={"space-around"}>
              <InputFile name={"jobImage1"} />
              <InputFile name={"jobImage2"} />
              <InputFile name={"jobImage3"} />
              <InputFile name={"jobImage4"} />
            </HStack>
            <InputField
              label="仕事の応募期限"
              type="date"
              name="applicationDeadline"
              helperText="（※期限内に応募がない場合、募集は終了されます。再公募可）"
              helperTextColor="red.600"
              required
            />
            <InputField
              label="仕事の希望開始時期"
              type="date"
              name="startDate"
              required
            />
            <InputField
              label="仕事の希望完了時期"
              type="date"
              name="endDate"
              required
            />
            <HStack justifyContent={"flex-end"}>
              <Button
                type="submit"
                isLoading={isSubmitting}
                onClick={() => (values.status = "DRAFT")}
              >
                下書きとして保存
              </Button>
              <Button
                type="submit"
                isLoading={isSubmitting}
                onClick={() => (values.status = "REGISTERED")}
              >
                新しい仕事を登録する
              </Button>
            </HStack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default FormJob;
