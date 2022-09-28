import * as React from 'react';
import styled from 'styled-components';
import decamelize from 'decamelize';

const StyledContainer = styled.div`
  flex-direction: column;
  align-items: center;
  display: flex;
  position: relative;
`;

const StyledInfoContainer = styled.div`
  flex-direction: column;
  display: flex;
  gap: 12px;
  position: absolute;
  top: 100%;
  left: -1px;
  z-index: 1;
  margin-top: 4px;
  box-shadow: 0 4px 8px -2px rgba(12, 41, 56, 0.25),
    0 0 1px 0 rgba(12, 41, 56, 0.31);
  min-width: 240px;
  width: auto;
  padding: 24px;
  border-radius: 6px;
  background-color: #fff;
`;

const StyledHeading = styled.div`
  margin-bottom: 4px;
  font-size: 13px;
  font-weight: bold;
  color: #1f282e;
`;

const StyledItem = styled.button`
  position: relative;
  justify-content: center;
  display: flex;
  transition: background-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  border: 1px solid lightgrey;
  outline: none;
  border-radius: 4px;
  width: 80px;
  padding: 1.2rem;
  background: none;
  cursor: pointer;
  color: #1f282e;

  &:hover,
  &:focus,
  &:active {
    background-color: #f6f6f6;
  }

  &:focus-visible {
    box-shadow: rgb(83 186 237) 0 0 0 2px;
  }
`;

const StyledText = styled.p`
  margin: 0;
  font-size: 12px;
  white-space: nowrap;
`;

const StyledMark = styled.mark`
  background-color: #c6dbf5;
  font-weight: bold;
  color: #5b6870;
`;

const StyledTags = styled.div`
  flex-wrap: wrap;
  column-gap: 8px;
  row-gap: 2px;
  display: flex;
  font-size: 12px;

  span {
    white-space: nowrap;
  }
`;

const highlight = (str: string, match: string, prefix = '') => {
  if (match === '')
    return (
      <span>
        {prefix}
        {str}
      </span>
    );
  const from = str.toLowerCase().indexOf(match.toLowerCase().trim());
  if (from < 0) return <span>#{str}</span>;
  const to = from + match.length;
  const pre = str.slice(0, from);
  const highlight = str.slice(from, to);
  const suf = str.slice(to);
  return (
    <span>
      {prefix}
      {pre}
      <StyledMark>{highlight}</StyledMark>
      {suf}
    </span>
  );
};

interface ItemProps {
  children: React.ReactElement;
  name: string;
  match: string;
  tags: string[];
}

export const Item: React.FC<ItemProps> = ({ children, name, match, tags }) => {
  const [showInfo, setShowInfo] = React.useState(false);
  return (
    <StyledContainer>
      <StyledContainer>
        <StyledItem onClick={() => setShowInfo(!showInfo)}>
          {children}
        </StyledItem>
        {showInfo && (
          <StyledInfoContainer>
            <div>
              <StyledHeading>React component name</StyledHeading>
              <StyledText>{highlight(name, match)}</StyledText>
            </div>
            <div>
              <StyledHeading>Class name</StyledHeading>
              <StyledText>
                {highlight(decamelize(name, { separator: '-' }), match, '')}
              </StyledText>
            </div>
            {tags?.length > 1 && (
              <div>
                <StyledHeading>Tags</StyledHeading>
                <StyledTags>
                  {tags.map((tag) => highlight(tag, match))}
                </StyledTags>
              </div>
            )}
          </StyledInfoContainer>
        )}
      </StyledContainer>
    </StyledContainer>
  );
};
