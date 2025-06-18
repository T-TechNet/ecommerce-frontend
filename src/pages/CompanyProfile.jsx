import React from "react";
import styled from "styled-components";
import "../css/terms.css";

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: context-menu;
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
  display: flex;
  justify-content: center;

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
  color: #00688b;
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
  font-weight: 700;
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

const CompanyProfile = () => {
  return (
    <Container>
      <Wrapper>
        <Header>Rangoon Discount Co., Ltd.</Header>
        {/* <ListContainer>
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
        </ListContainer> */}

        {/* 1. Company Overview */}
        <Content id="tag1">
          <Title>Company Overview</Title>
          <Paragraph>
            Rangoon Discount Co., Ltd. is an e-commerce company based in
            Rangoon, dedicated to providing customers with a wide range of ICT
            (Information and Communication Technology) products at discounted
            prices. Our website, rangoondiscount.com, serves as a convenient
            online platform for customers to explore and purchase the latest
            technology products with ease.
          </Paragraph>
        </Content>

        {/* 2. Mission */}
        <Content id="tag2">
          <Title>Mission</Title>
          <Paragraph>
            At Rangoon Discount, our mission is to become the leading
            destination for affordable ICT products in the region. We strive to
            offer a diverse selection of high-quality products, exceptional
            customer service, and competitive prices, making technology
            accessible to everyone.
          </Paragraph>
        </Content>

        {/* 3. Product Offerings */}
        <Content id="tag3">
          <Title>Product Offerings</Title>
          <Paragraph>
            We specialize in a comprehensive range of ICT products, including
            but not limited to:
          </Paragraph>

          <UnorderList>
            <Li>Computers and Laptops</Li>
            <Point>
              We offer a variety of desktop computers, laptops, and accessories
              from renowned brands, ensuring reliability, performance, and the
              latest technological advancements.
            </Point>
            <Li>Mobile Devices</Li>
            <Point>
              Our selection includes smartphones, tablets, smartwatches, and
              accessories, enabling customers to stay connected and empowered in
              today's digital world.
            </Point>
            <Li>Networking and Connectivity</Li>
            <Point>
              We provide networking devices, routers, modems, Wi-Fi equipment,
              and cables to facilitate seamless connectivity and smooth internet
              experiences.
            </Point>
            <Li>Peripherals and Accessories</Li>
            <Point>
              From printers, scanners, and monitors to keyboards, mice, and
              speakers, we offer a wide array of peripherals and accessories to
              enhance productivity and multimedia experiences.
            </Point>
            <Li>Software and Licenses</Li>
            <Point>
              We provide genuine software solutions, licenses, and subscriptions
              for operating systems, productivity suites, antivirus programs,
              and more, ensuring reliable and secure computing environments.
            </Point>
            <Li>Gaming and Entertainment</Li>
            <Point>
              Our gaming section features gaming consoles, gaming laptops,
              accessories, and a collection of popular video games to cater to
              the needs of avid gamers and entertainment enthusiasts.
            </Point>
          </UnorderList>
        </Content>

        {/* 4. Local and Foreign Partners */}
        <Content id="tag4">
          <Title>Local and Foreign Partners</Title>
          <Paragraph>
            Rangoon Discount Co., Ltd. recognizes the importance of strategic
            partnerships to deliver the best products and services to our
            customers. We have established strong relationships with both local
            and foreign partners, enabling us to offer a diverse and
            high-quality product range.
          </Paragraph>

          <UnorderList>
            <Li>Local Partnerships</Li>
            <Point>
              We collaborate with local ICT distributors and manufacturers to
              source a wide range of products. These partnerships allow us to
              have a reliable supply chain, access to the latest technology
              offerings, and competitive pricing. By working closely with local
              partners, we contribute to the growth of the domestic ICT industry
              and support the local economy.
            </Point>
            <Li>Foreign Partnerships</Li>
            <Point>
              We have forged partnerships with reputable international brands
              and manufacturers to bring globally recognized ICT products to our
              customers. These collaborations enable us to offer a broader
              selection of products, including renowned brands and cutting-edge
              technologies. By partnering with foreign companies, we aim to
              provide customers with access to the latest global trends in ICT.
            </Point>
          </UnorderList>

          <Paragraph>
            These partnerships are built on mutual trust, shared values, and a
            commitment to delivering quality products. We work closely with our
            partners to ensure seamless integration of their products into our
            inventory, efficient logistics, and effective customer support.
          </Paragraph>
        </Content>

        {/* 5. Customer Satisfaction */}
        <Content id="tag5">
          <Title>Customer Satisfaction</Title>
          <Paragraph>
            At Rangoon Discount, customer satisfaction is our top priority. We
            aim to deliver a seamless online shopping experience, offering
            competitive prices, secure payment options, and efficient order
            processing. Our dedicated customer support team is available to
            assist customers with any inquiries, ensuring their needs are met
            promptly and effectively.
          </Paragraph>
        </Content>

        {/* 6. Corporate Responsibility */}

        <Content id="tag6">
          <Title>Corporate Responsibility</Title>
          <Paragraph>
            We believe in conducting business responsibly and ethically. We
            strive to minimize our environmental impact by promoting sustainable
            practices throughout our operations. Additionally, we actively seek
            opportunities to give back to the community by supporting
            initiatives that foster technological literacy and empowerment.
          </Paragraph>
        </Content>

        {/* 7. Conclusion */}

        <Content id="tag7">
          <Title>Conclusion</Title>
          <Paragraph>
            Rangoon Discount Co., Ltd. is committed to being a trusted
            e-commerce platform for ICT products, providing our customers with
            high-quality products at discounted prices. With a user-friendly
            website, a vast product range, and exceptional customer service, we
            aim to revolutionize the way customers access and experience.
          </Paragraph>
        </Content>
      </Wrapper>
    </Container>
  );
};

export default CompanyProfile;
