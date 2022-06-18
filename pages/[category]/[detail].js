import React from 'react';
import styled from 'styled-components';
import { supabaseAdmin } from '../../utils/supabase';
import Link from 'next/link';
import Image from 'next/image';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  min-height: 100vh;
  flex-wrap: wrap;
  background-color: black;
  color: white;
  overflow: hidden;
`;
const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
const StyledLink = styled.a`
  opacity: 0.88;
  border: 5px solid #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 50px;
  width: 167px;
  height: 41px;
  background-color: transparent;
  color: #fff;
  text-decoration: none;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  text-transform: uppercase;
  line-height: 43px;
`;
const StyledTitle = styled.h1`
  text-transform: uppercase;
  font-size: 40px;
  text-align: center;
`;

const StyledContent = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: center;
  margin: auto 0;
  flex-direction: row;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

const StyledImageContainer = styled.div`
  flex: 1;
`;
const StyledDetails = styled.div`
  flex: 1;
`;

const StyledImage = styled(Image)`
  width: 100%;
  height: 100%;
`;
const StyledList = styled.ul`
  padding: 0;
  list-style-type: none;
  font-size: 52px;
  font-weight: bold;

  @media (max-width: 1024px) {
    font-size: 25px;
  }
`;
const StyledListItem = styled.li`
  margin: 20px 0;
  @media (max-width: 1024px) {
    text-align: center;
  }
`;

const Detail = ({ content }) => {
  const detailsInfo = [
    {
      name: 'Nazwa',
      value: content.name,
    },
    {
      name: 'Typ',
      value: content.type,
    },
    {
      name: 'Księżyce',
      value: content.satellites,
    },
    {
      name: 'Zdatna do życia',
      value: content.viable,
    },
    {
      name: 'Atmosfera',
      value: content.atmosphere,
    },
    {
      name: 'Temperatura',
      value: content.temperature,
    },
    {
      name: 'Odwiedzona przez człowieka',
      value: content.visited,
    },
    {
      name: 'Typ widmowy',
      value: content.spectral_type,
    },
  ];
  return (
    <StyledContainer>
      <StyledHeader>
        <Link href={`/${content.category.name}`} passHref>
          <StyledLink>← Powrót</StyledLink>
        </Link>
        <StyledTitle></StyledTitle>
        <Link href='/' passHref>
          <StyledLink>Menu</StyledLink>
        </Link>
      </StyledHeader>
      <StyledContent>
        <StyledImageContainer>
          <StyledImage
            alt={content.image}
            src={content.image}
            width={660}
            height={495}
            quality={50}
          />
        </StyledImageContainer>
        <StyledDetails>
          <StyledList>
            {detailsInfo.map((detail, i) => {
              if (detail.value == undefined) {
                return null;
              } else {
                return (
                  <StyledListItem key={i}>
                    {detail.name}: {detail.value}
                  </StyledListItem>
                );
              }
            })}
          </StyledList>
        </StyledDetails>
      </StyledContent>
    </StyledContainer>
  );
};

export default Detail;

export async function getStaticProps({ params }) {
  const { data: data } = await supabaseAdmin
    .from(`${params.category}`)
    .select(`*, category (name, displayname)`)
    .ilike('name', `${params.detail}`)
    .single();

  return {
    props: {
      content: data,
    },
  };
}

export async function getStaticPaths() {
  const getAll = async () => {
    const { data: planets } = await supabaseAdmin
      .from('planets')
      .select(`name, category (name)`);
    const { data: stars } = await supabaseAdmin
      .from('stars')
      .select(`name, category (name)`);
    const { data: satellites } = await supabaseAdmin
      .from('satellites')
      .select(`name, category (name)`);
    return [planets, stars, satellites];
  };
  const data = await getAll();
  const paths = data.map((data) => {
    return data.map((data) => {
      const itemName = data.name.toString().toLowerCase();
      const itemCategory = data.category.name
        .toString()
        .toLowerCase();
      return {
        params: {
          category: itemCategory,
          detail: itemName,
        },
      };
    });
  });
  let arr = [];
  paths.map((paths) => {
    paths.map((paths) => {
      arr.push(paths);
    });
  });
  return {
    paths: arr,
    fallback: false,
  };
}
