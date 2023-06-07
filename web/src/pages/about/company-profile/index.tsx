import {
  Box,
  Heading,
  Text,
  Link,
  useColorModeValue,
  HStack,
} from "@chakra-ui/react";
import MainLayout from "../../../components/Layout/MainLayout";
import Card from "./Card";
import CardContent from "./CardContent";
import CardHeader from "./CardHeader";
import Property from "./Property";
import NextLink from "next/link";
import NextImage from "next/image";

interface companyProfileProps {}

const CompanyProfile: React.FC<companyProfileProps> = ({}) => {
  return (
    <MainLayout>
      <Box as="section" py="12" px={{ md: "8" }}>
        <Card maxW="6xl" mx="auto">
          <CardHeader title="会社概要" />
          <CardContent>
            <Property label="屋号" value="エコピア" />
            <Property label="英文屋号" value="ＥＣＯＰＥＥＲ" />
            <Property label="代表" value="櫻井　守" />
            <Property
              label="所在地"
              value="〒 ３１１－３４３２ 茨城県小美玉市下玉里１３６４－２"
            />
            <Property label="創業" value="２０１３年５月１３日" />
            <Property label="エコピアスタート" value="２０２３年４月１日" />
            <Property
              label="グループ会社"
              value="自社発電所を25カ所ほど所有し運営中"
            />
          </CardContent>
        </Card>
      </Box>
      <Box
        maxW="6xl"
        mx="auto"
        bg={useColorModeValue("white", "gray.700")}
        rounded={{ md: "lg" }}
        shadow="md"
        py={5}
      >
        <Text textAlign={"center"}>
          エコピアの事業所は、湖のほとりに佇む荒れ果てていた築60年の古民家を再利用した環境に優しいエコハウスです。
        </Text>
        <HStack m={4}>
          <Box>
            <div style={{pointerEvents: 'none'}}>
            <NextImage
              src={"/images/pages/companyProfile/left.jpg"}
              width={"500px"}
              height={"500px"}
              // layout={"responsive"}
              // objectFit={"contain"}
              priority
            />
            </div>
          </Box>
          <Box>
            <div style={{pointerEvents: 'none'}}>
            <NextImage
              src={"/images/pages/companyProfile/center.jpg"}
              width={"500px"}
              height={"500px"}
              // layout={"responsive"}
              // objectFit={"contain"}
              priority
            />
            </div>
          </Box>
          <Box rounded={"md"}>
            <div style={{pointerEvents: 'none'}}>
            <NextImage
              src={"/images/pages/companyProfile/right.png"}
              width={"500px"}
              height={"500px"}
              // layout={"responsive"}
              // objectFit={"contain"}
              priority
            />
            </div>
          </Box>
        </HStack>
      </Box>
      <Box
        maxW="6xl"
        mx="auto"
        bg={useColorModeValue("white", "gray.700")}
        rounded={{ md: "lg" }}
        shadow="md"
        py={5}
        overflow="hidden"
        my={8}
      >
        <Heading px="6" textAlign={"center"} fontSize="lg">
          コーポレートメッセージ
        </Heading>
        <Heading
          px="6"
          py="4"
          borderBottomWidth="1px"
          textAlign={"center"}
          fontSize="md"
          mb={8}
        >
          美しい地球をいつまでも未来へつなぐために
        </Heading>
        <Box textAlign={"center"}  px={8}>
          <Text>
            発電所の建設・運営管理に関わるお困りごとは、エコピアで解決！
          </Text>
          <Text>自分で業者さんを探してマッチング！</Text>

          <Text mt={3}>
            こんな機能を追加してほしい等の改善点、ご感想などございましたら、
          </Text>
          <Text>
            どんな些細な事でも{" "}
            <NextLink passHref href={"/about/contact-us"}>
              <Link color={"blue.500"}>「お問合せ」</Link>
            </NextLink>
            よりご連絡頂ければ幸いです。
          </Text>
          {/* <Text>
            私の住む茨城県は、太陽光発電所の設置数が全国一多い都道府県です。
          </Text>
          <Text>
            自身も太陽光発電所を複数保有しており、日々の草刈、パネル洗浄、修理依頼、防犯カメラ設置等
          </Text>
          <Text>
            その都度みなさん同様たくさん悩み、管理に時間を費やしてきました。
          </Text>
          <Text>
            そんな毎日の中で、当サービスを思いつきました。まだ完成度は不完全で満足いくものでは
          </Text>
          <Text>ありませんが、随時機能を追加していく予定です。</Text>
          <Text>
            全国14万人程度いると思われる太陽光発電所所有者のみなさんにとって、当サービスが
          </Text>
          <Text>利用価値の高いものになることを願っております。</Text>
          <Text>
            改善点などお気づきの点がございましたら、「お問合せ」よりご連絡頂ければ幸いです。
          </Text>
          <Text>
            みなさまのご協力、ご指導、ご鞭撻どうぞよろしくお願いいたします。
          </Text> */}
        </Box>
      </Box>
    </MainLayout>
  );
};

export default CompanyProfile;
