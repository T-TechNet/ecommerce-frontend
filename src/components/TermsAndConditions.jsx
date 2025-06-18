import React from "react";
import styled from "styled-components";
import "../css/terms.css";

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 1140px;
  padding-bottom: 80px;

  @media screen and (max-width: 1203px) {
    width: 95%;
  }

  @media screen and (max-width: 759px) {
    width: 90%;
    padding-bottom: 20px;
  }
`;

const Header = styled.div`
  font-weight: 700;
  font-size: 32px;
  color: #002734;
  padding: 25px 0;

  @media screen and (max-width: 759px) {
    font-size: 20px;
    padding: 15px 0;
  }
`;

const ListContainer = styled.div`
  padding-bottom: 10px;
`;

const Tag = styled.p`
  font-weight: 600;
  font-size: 18px;
  color: #00688b;
  padding: 8px 0;
  cursor: pointer;

  @media screen and (max-width: 759px) {
    font-size: 16px;
    font-weight: 700;
  }
`;

const Content = styled.div`
  padding: 8px 0;
`;
const Title = styled.div`
  font-weight: 700;
  font-size: 23px;
  color: #002734;
  padding: 10px 0;

  @media screen and (max-width: 759px) {
    font-size: 18px;
  }
`;

const Paragraph = styled.div`
  font-weight: 400;
  font-size: 16px;
  color: #000000;
  padding: 10px 0;

  @media screen and (max-width: 759px) {
    font-size: 14px;
  }
`;

const UnorderList = styled.ul`
  list-style-type: disc;
  margin-left: 50px;

  @media screen and (max-width: 759px) {
    margin-left: 25px;
  }
`;

const Li = styled.li`
  padding-bottom: 5px;
  /* vertical-align: middle; */

  &::marker {
    display: inline-block;
    color: #00688b;
    font-size: 30px;
  }

  @media screen and (max-width: 759px) {
    font-size: 14px;
    padding: 0;

    &::marker {
      display: inline-block;
      color: #00688b;
      font-size: 25px;
    }
  }
`;

const Point = styled.p`
  padding: 4px 0 8px 0;

  @media screen and (max-width: 759px) {
    font-size: 14px;
  }
`;

const Row = styled.div`
  display: flex;
  gap: 10px;
  padding: 6px 0;
`;

const Info = styled.div`
  width: ${(props) => props.className === "title" && "200px"};

  @media screen and (max-width: 759px) {
    width: fit-content;
  }
`;

const TermsAndConditions = () => {
  return (
    <Container>
      <Wrapper>
        <Header>Terms and Conditions</Header>
        <ListContainer>
          <Tag>
            <a href="#tag1">1. What is Rangoon Discount?</a>
          </Tag>
          <Tag>
            <a href="#tag2">2. All products and services</a>
          </Tag>
          <Tag>
            <a href="#tag3">3. Cancellation</a>
          </Tag>
          <Tag>
            <a href="#tag4">4. Delivery Date</a>
          </Tag>
          <Tag>
            <a href="#tag5">5. Returns & Refunds</a>
          </Tag>
          <Tag>
            <a href="#tag6">6. Payment Methods</a>
          </Tag>
          <Tag>
            <a href="#tag7">7. Privacy</a>
          </Tag>
          <Tag>
            <a href="#tag8">8. Contacting</a>
          </Tag>
        </ListContainer>

        {/* 1. What is Rangoon Discount */}
        <Content id="tag1">
          <Title>1. What is Rangoon Discount?</Title>
          <Paragraph>
            Rangoon Discount is an E-Commerce platform related with Website,
            Facebook page, Head Office and all online and offline entities which
            include authorized and authentic logo and contents of
            rangoondiscount.com.
          </Paragraph>
          <Paragraph>
            Rangoon Discount သည် ဝက်ဆိုဒ်၊ Facebook စာမျက်နှာ၊ ရုံးချုပ်နှင့်
            rangoondiscount.com ၏ ခွင့်ပြုချက်နှင့် စစ်မှန်သော လိုဂိုနှင့်
            အကြောင်းအရာများပါဝင်သော အွန်လိုင်းနှင့် အော့ဖ်လိုင်း အဖွဲ့အစည်းများ
            အားလုံးနှင့်သက်ဆိုင်သည့် E-Commerce ပလပ်ဖောင်းတစ်ခုဖြစ်သည်။
          </Paragraph>
        </Content>

        {/* 2. All products and services */}
        <Content id="tag2">
          <Title>2. All products and services</Title>
          <Paragraph>
            After clicking 'Order Confirm' on the checkout page and receiving a
            success order email will be considered as Date of Sold.
          </Paragraph>
          <Paragraph>
            ကုန်ပစ္စည်း၊ ဝန်ဆောင်မှုများကို Page တွင် ‘Order Confirm’
            ခလုပ်နှိပ်ပြီး ‘Order’ အောင်မြင်ကြောင်း
            အီးမေးလ်ကိုရရှိသည်နှင့်တစ်ပြိုင်နက် ပစ္စည်းဝယ်ယူသည့်နေ့အဖြစ်
            သတ်မှတ်မည်ဖြစ်ပါသည်။
          </Paragraph>
        </Content>

        {/* 3. All products and services */}
        <Content id="tag3">
          <Title>3. Cancellation</Title>
          <Paragraph>
            rangoondiscount.com has the right to cancel any order if a customer
            does not pay for an invoice within three (3) working days or the
            customer is uncontactable. The customer can also cancel by calling
            the office telephone number (+959 942095359) during the first one
            (1) hour from the time of purchase.
          </Paragraph>
          <Paragraph>
            အော်ဒါတင်ပြီး ၃ ရက်အတွင်း ငွေပေးချေမှုမရှိသေးသော အော်ဒါများ
            (သို့မဟုတ်) Customer ကို ဆက်သွယ်၍မရပါက Rangoon Discount ဘက်မှ
            ၎င်းအော်ဒါများကို အလိုအလျောက် ပယ်ဖျက်သွားမည်။ Customer ဘက်မှလည်း
            ဝယ်ယူပြီးပြီးချင်း ၁ နာရီအတွင်း ရုံးဖုန်းနံပါတ် (+959 942095359)
            ကိုခေါ်ဆို၍ဖြစ်စေ အော်ဒါကို ပယ်ဖျက်ခွင့်ရှိသည်။
          </Paragraph>
        </Content>

        {/* 4. Delivery Date */}
        <Content id="tag4">
          <Title>4. Delivery Date</Title>
          <Paragraph>
            Delivery Date is the date when the customer signed on the slip of
            rangoondiscount.com delivery date.
          </Paragraph>
          <Paragraph>
            ဝယ်ယူသူမှ rangoondiscount.com မှ ပစ္စည်းလက်ခံရရှိသည်ဟု
            လက်မှတ်ထိုးသည့်နေ့ကို Delivery Date ဟုသတ်မှတ်မည်ဖြစ်ပါသည်။
          </Paragraph>
        </Content>

        {/* 5. Returns & Refunds */}
        <Content id="tag5">
          <Title>5. Returns & Refunds</Title>
          <Paragraph>
            Apart from Public Holidays, items with the following conditions are
            qualified to be returned within 3 working days and Rangoon Discount
            will re-deliver with the same model or non-returnable without any
            conditions.
          </Paragraph>
          <Paragraph>
            အများပြည်သူရုံးပိတ်ရက်များမှအပ ဝယ်ယူသည့်ကုန်ပစ္စည်းများကို
            အောက်ပါအကျိုးအကြောင်းတစ်စုံတစ်ရာဖြင့် ကြုံတွေ့ခဲ့ရပါက ၃ ရက်
            အတွင်းပြန်လည်လဲလှယ်နိုင်မည်။ သို့မဟုတ်ပါက မည်သည့်အကြောင်းကြောင့်မှ
            ဝယ်ယူပြီးပစ္စည်းများကို ပြန်လည်လဲလှယ်ပေးမည်မဟုတ်ပါ။
          </Paragraph>

          <UnorderList>
            <Li>
              Items are not correct as stated on the invoice. (e.g., wrong
              color, wrong model).
            </Li>
            <Point>
              ဘောင်ချာထဲမှာ ဖော်ပြထားသည့်အတိုင်းမဟုတ်ခဲ့ပါက။ (ဥပမာ-
              အရောင်မှားနေခြင်း၊ ပစ္စည်းအမျိုးအမည်မှားနေခြင်း)
            </Point>
            <Li>Items are unboxed and/or damaged.</Li>
            <Point>
              ပစ္စည်း၏ အထုပ်အပိုးပျက်စီးပြီး ဖွင့်ဖောက်အသုံးပြုထားခြင်း။
            </Point>
            <Li>
              Remark- rangoondiscount.com will unbox according to customer's
              request e.g., Installing Software, Upgrading the OS etc. The
              unboxing condition might not be applied for Returns and Refund.
            </Li>
            <Point>
              Rangoon Discount သည် ဝယ်ယူသူ၏တောင်းဆိုချက်အရ ဥပမာ
              ဆော့ဝဲထည့်သွင်းခြင်း၊ OS အဆင့်မြှင့်တင်ခြင်း စသည်တို့ကို customer
              ၏ တောင်းဆိုချက်အရ ဘောက်စ် ကိုပြန်ဖွင့်ပါမည်။ Returns and Refunds
              အခြေအနေအတွက် ဘောက်စ်ဖွင့်ခြင်းအခြေအနေသည် သက်ရောက်မှုရှိမည်
              မဟုတ်ပါ။
            </Point>
          </UnorderList>
        </Content>

        {/* 6. Payment Methods */}

        <Content id="tag6">
          <Title>6. Payment Methods</Title>
          <Paragraph>
            Three of payment methods are available on Rangoon Discount as
            follows:
          </Paragraph>
          <UnorderList>
            <Li>Cash On Delivery.</Li>

            <Li>Bank Deposit option is available on select location.</Li>

            <Li>Bank Deposit option is available on select location.</Li>
          </UnorderList>
          <Paragraph>
            For Cash on Delivery, the customer will receive a phone call from
            Rangoon Discount sales team member for confirmation and start the
            process as soon as possible.
          </Paragraph>
          <Paragraph>
            Using Direct Bank Transfer method and Online Quick Payment, the
            customer must provide a bank slip or receipt of transfer to Rangoon
            Discount sales team via rangoondiscount.com or Viber phone number.
            As soon as the payment is clear on Rangoon Discount Bank account,
            the delivery process will start asap.
          </Paragraph>
          <Paragraph>
            Rangoon Discount တွင် အောက်ပါငွေပေးချေမှု ၃ ရပ်ဖြင့်
            လက်ခံရောင်းချပေးပါသည်။
          </Paragraph>
          <UnorderList>
            <Li>ပစ္စည်းလက်ခံရရှိမှ ငွေချေစနစ်</Li>

            <Li>ဘဏ်သို့ တိုက်ရိုက်ကြိုတင်ငွေလွှဲစနစ်</Li>

            <Li>KBZ Pay, i-Banking ကဲ့သို့သော Online ငွေချေစနစ်</Li>
          </UnorderList>
          <Paragraph>
            ဝယ်ယူသူသည် ပစ္စည်းလက်ခံရရှိမှ ငွေပေးစနစ်ဖြင့် ဝယ်ယူပါက Rangoon
            Discount မှ အရောင်းကိုယ်စားလှယ်ထံမှ ဖုန်းခေါ်ဆိုမှုကို
            လက်ခံရရှိမည်ဖြစ်ပြီး နေရပ်လိပ်စာများကို အတည်ပြုကာ
            ပစ္စည်းထုပ်ပိုးမှုများနှင့် အိမ်အရောက်ဝန်ဆောင်မှုများကို အချိန်နှင့်
            တပြေးညီ ဆောင်ရွက်သွားမည်ဖြစ်ပါသည်။
          </Paragraph>
          <Paragraph>
            ဝယ်ယူသူသည် ဘဏ်မှကြိုတင် ငွေလွှဲပေးချေစနစ် (သို့) Online
            ငွေချေစနစ်ဖြင့်ဝယ်ယူပါက ဝန်ဆောင်မှု ပိုမိုမြန်ဆန်အောင် Customer မှ
            ဘဏ်ငွေလွှဲဖြတ်ပိုင်းကို sales@rangoondiscount.com (သို့) Rangoon
            Discount Sale Team Viber မှတဆင့်ပို့ပေးနိုင်ပါသည်။ Rangoon Discount
            ဘဏ်အကောင့်ထဲသို့ငွေလွှဲဝင်လာသည်နှင့် တစ်ပြိုင်နက်တည်း အိမ်အရောက်
            ဝန်ဆောင်မှုများကို အချိန်နှင့် တပြေးညီ ဆောင်ရွက်သွားမည်ဖြစ်ပါသည်။
          </Paragraph>
        </Content>

        {/* 7. Privacy */}

        <Content id="tag7">
          <Title>7. Privacy</Title>
          <Paragraph>
            Rangoon Discount will collect and share information like your name,
            your address, your email, and your phone number with our logistics
            partners for delivery and marketing and promotion campaign from
            rangoondiscount.com only.
          </Paragraph>
          <Paragraph>
            Rangoon Discount သည် Customer ၏ အမည်၊လိပ်စာနှင့် ဖုန်းနံပါတ်များကို
            ပို့ဆောင်ပေးသည့် ကုမ္ပဏီများသို့ လိုအပ်သည့်
            အချက်အလက်အချို့ပေးပို့ရပါသည်။ အီးမေးလ်၊ ဖုန်းနံပါတ်တို့ကို
            ဝယ်ယူသူများအတွက် ပရိုမိုးရှင်းများကို အစဥ်သိနေနိုင်စေရန် Rangoon
            Discount တစ်ဦးတည်းသာ အသုံးပြုပါသည်။
          </Paragraph>
        </Content>

        {/* 8. Contacting */}
        <Content id="tag8">
          <Title>8. Contacting</Title>
          <Paragraph>
            Please use the following communication channels (24/7).
          </Paragraph>
          <Paragraph>
            အောက်ပါလင့်များတွင် အချိန်မရွေး ဆက်သွယ်နိုင်ပါသည်။
          </Paragraph>
          <Row>
            <Info className="title">Facebook & Messenger</Info>
            <Info>:</Info>
            <Info>Rangoon Discount</Info>
          </Row>
          <Row>
            <Info className="title">Telephone</Info>
            <Info>:</Info>
            <Info>+959 942095359</Info>
          </Row>
          <Row>
            <Info className="title">Viber</Info>
            <Info>:</Info>
            <Info>+959 763488996</Info>
          </Row>
          <Row>
            <Info className="title">Email</Info>
            <Info>:</Info>
            <Info>contact@rangoondiscount.com</Info>
          </Row>
        </Content>
      </Wrapper>
    </Container>
  );
};

export default TermsAndConditions;
