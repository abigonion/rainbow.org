import React, { Component } from 'react'
import intl from 'react-intl-universal'
import styled from 'styled-components'
import { container } from '../../src/styles'
import { media } from '../../src/styles'


export class FreaturesFont extends Component {
    render() {
        return (
            <Container>
                <Features>
                    <Feature>
                        <Icon>
                            <img
                                src="/static/img/features/icons/git-icon.svg"
                                alt="Git compatible"
                            />
                        </Icon>
                        <Name>{intl.get("technology")}</Name>
                        <Description>
                            {intl.get("blockchain technology")}
                        </Description>
                    </Feature>
                    <Feature>
                        <Icon>
                            <img
                                src="/static/img/features/icons/storage-icon.svg"
                                alt="Storage agnostic"
                            />
                        </Icon>
                        <Name>{intl.get("Storage agnostic")}</Name>
                        <Description>
                            {intl.get("Use S3")}
                        </Description>
                    </Feature>
                    <Feature>
                        <Icon>
                            <img
                                src="/static/img/features/icons/repro.svg"
                                alt="Reproducibility"
                            />
                        </Icon>
                        <Name> {intl.get("Asset")}</Name>
                        <Description>
                            {intl.get("liquidity")}
                        </Description>
                    </Feature>
                    <Feature>
                        <Icon>
                            <img
                                src="/static/img/features/icons/branching.svg"
                                alt="Low-friction branching"
                            />
                        </Icon>
                        <Name>{intl.get("Cross-border")}</Name>
                        <Description>
                            {intl.get("payments services")}
                        </Description>
                    </Feature>
                    <Feature>
                        <Icon>
                            <img src="/static/img/features/icons/storage-icon.svg" alt="" />
                        </Icon>
                        <Name>{intl.get("Enterprise")}</Name>
                        <Description>
                            {intl.get("Built for enterprise")}
                        </Description>
                    </Feature>
                    <Feature>
                        <Icon>
                            <img
                                src="/static/img/features/icons/ml-pipe.svg"
                                alt="ML pipelines framework"
                            />
                        </Icon>
                        <Name> {intl.get("Reliable volume")}</Name>
                        <Description>
                            {intl.get("participants")}
                        </Description>
                    </Feature>
                    <Feature>
                        <Icon>
                            <img
                                src="/static/img/features/icons/languages-icon.svg"
                                alt="Language & framework agnostic"
                            />
                        </Icon>
                        <Name>{intl.get("Faster settlement")}</Name>
                        <Description>
                            {intl.get("over bitcoin")}
                        </Description>
                    </Feature>
                    <Feature>
                        <Icon>
                            <img
                                src="/static/img/features/icons/cluster.svg"
                                alt="HDFS, Hive & Apache Spark"
                            />
                        </Icon>
                        <Name>{intl.get("Connects banks")}</Name>
                        <Description>
                            {intl.get("infrastructure")}
                        </Description>
                    </Feature>
                    <Feature>
                        <Icon>
                            <img
                                src="/static/img/features/icons/failures.svg"
                                alt="Failure tracking"
                            />
                        </Icon>
                        <Name> {intl.get("Track failures")}</Name>
                        <Description>
                            {intl.get("Bad ideas")}
                        </Description>
                    </Feature>
                </Features>
                </Container>
            


        )
    }
}

export default FreaturesFont;

const Container = styled.div`
  ${container};
`
const Features = styled.div`
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
  padding-top: 110px;
  padding-bottom: 90px;

  ${media.phablet`
    padding-top: 70px;
    padding-bottom: 50px;
	`};
`

const Feature = styled.div`
  flex: 33.3%;
  flex-basis: 311px;
  margin-bottom: 63px;
`
const Icon = styled.div`
  height: 48px;

  img {
    width: 48px;
    height: 48px;
  }
`

const Name = styled.h3`
  font-family: BrandonGrotesqueMed;
  margin-top: 10px;
  margin-bottom: 10px;

  font-size: 20px;
  font-weight: 500;
  color: #40364d;

  min-height: 28px;
`

const Description = styled.div`
  max-width: 311px;

  font-size: 16px;
  color: #5f6c72;
`
