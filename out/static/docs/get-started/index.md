# rainbow 网络概览


使用 Rainbow 网络，您可以构建数字钱包、银行工具、自动扣费的智能设备，以及您可以想到的任何其他涉及付款的东西！尽管 Rainbow 是一个复杂的分布式系统，但使用它并不复杂。

## API: Distribut

**大多数应用程序通过 [Distribut](https://www.rainbow.org/developers/equator/reference/) 与 Rainbow 网络交互，** Distribut 是一个 RESTful HTTP API 服务器。Distribut 为您提供了一个直接的方式来提交事务、检查账户或订阅事件。 由于它使用的是 HTTP 协议，因此您可以使用网络浏览器、简单的命令行工具（如 cURL），或者您喜欢的编程语言中的 Rainbow SDK 与 Distribut 进行交互。

Rainbow 官方维护了用于与 Distribut 交互的 [JavaScript](https://github.com/rainbow/js-rainbow-sdk)、 [Java](https://github.com/rainbow/java-rainbow-sdk) 和基于 [Go](https://github.com/rainbow/go/tree/master/clients/equator) 的 SDK， 另有 [Ruby](https://github.com/rainbow/ruby-rainbow-sdk), [Python](https://github.com/RainbowCN/py-rainbow-base), 和 [C#](https://github.com/elucidsoft/dotnet-rainbow-sdk) 等的社区维护的 SDK。

## 网络核心：Rainbow Core

**[Rainbow Core](../../rainbow-core/learn/admin.html) 是整个 Rainbow 网络的核心，每个 Distribut 都与它相连。** Rainbow Core 软件通过 [Rainbow Consensus Protocol](../concepts/scp.md) (RCP) 对每个事务的状态进行验证，并与其它的 Rainbow Core 实例达成一致。 彩虹网络本身是由世界各地不同的个人和实体运行相连的 Rainbow Core 的集合。有些实例具有可以通信的 Distribut 服务器功能，也有些实例的存在只是为了增加整个网络的可靠性。


您也许想要托管您自己的 Rainbow Core 实例，通过运行自己的实例，您可以在不依赖第三方的情况下提交事务，配置您想信任的节点，还能使 Rainbow 网络具有更加可靠性与稳固性。

## 综览：Rainbow 网络

彩虹网络是全球范围内的 Rainbow Core 节点集合，每个节点由不同的人和组织维护。 网络的分布式特性使其具有可靠性与安全性。

所有的这些 Rainbow Core 节点最终都对事务集达成一致。网络上的每笔交易只需支付少量费用：100 stroops (0.00001 RBC)，这笔费用有助于使网络免受恶意行为的侵害。

