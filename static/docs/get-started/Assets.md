# 资产

Rainbow 分布式网络可用于跟踪、持有和转移任何类型的资产：美元、欧元、比特币、股票、黄金和其他有价值的代币。网络中的任意两种资产可以进行交易和兑换。

除了原生资产 waterdrop 外，所有资产都有以下两个属性：
- **Asset type(资产类型)**: 例如 USD 或 BTC
- **Issuer(发行方)**: 创建资产的账户

## Trustlines (信任线)
您在 Rainbow 网络中持有资产，实际上是由 Issuer 发行的信贷。Issuer 允许将其在 Rainbow 网络上发行的信贷用于交换其它类型的资产，如法定货币、贵金属等。我们假设 Scott 在 Rainbow 网络上发行橙子代币作为信贷，一个橙子代币锚定一个橙子，这时您和 Scott 之间便有了一个基于信任的协定：当您给他一个橙子代币的时候，他需要给您一个橙子。

在持有一种资产之前，您应该确认 Issuer 有能力兑换它发行的资产。在 Rainbow 网络中，系统默认您没有信任任何 Issuer，所以如果您想持有某种资产，您必须先信任其 Issuer。在之前的例子中，如果您想持有橙子代币的话，您必须先信任 Scott 。

为了信任某个 Issuer，您需要创建一条 **trustline**。 Trustlines 是持久存在于 Rainbow 总账中的条目，它包含了您账户信任发行账户的限额和您账户当前持有的发行账户的信用额度。

从协议版本 10 开始，账户会记录它的负债情况，每个资产都有单独的负债记录。对某个资产来说，买入负债等于您所有挂单中买入该资产的总和，卖出负债等于您所有挂单中卖出该资产的总和。某项资产的卖出负债应该小于或等于您拥有此项资产的数量，而买入负债则应该小于或等于您可拥有该资产的上限减去您已经持有该资产的数量。

## waterdrop (RBC)
**waterdrop (RBC)** 是网络中的原生资产。waterdrop 是 Rainbow 网络中唯一一种不需要 Issuer 和 Trustline 就可以使用的资产。任何账户都可以持有 waterdrop，您可以用 waterdrop 交换网络中的其他资产。

## 锚点(Anchors)：资产发行方
任何账户都可以在 Rainbow 网络发行资产。发行资产的实体被称之为**锚点**，个人、小企业、社区、非营利组织以及任何类型的金融机构都可以成为锚点。

锚点使用 **issuing account(发行账户)** 来发行资产。

作为一个锚点，当您发行一个资产时，您需要给它设定一个 **asset code(资产代码)**。 资产由 asset code 和 issuing account(发行账号) 标识，每种资产都具有独一性。虽然 asset code 的设置取决于 issuer，但是按照惯例，货币应该用适当的 [ISO 4217 代码](https://en.wikipedia.org/wiki/ISO_4217) 代码来表示，对于股票和债券，应当使用适当的 [ISIN 代码](https://en.wikipedia.org/wiki/International_Securities_Identification_Number)，对于橙子、山羊和啤酒等物品，您可以设置一个自己认为合适的代码。

目前支持两种 asset code 格式。

#### 字母数字最多 4 个字符
任何包含在 [a-z][A-Z][0-9] 中的字符都是合法的，可以由 1 到 4 个字符组成。

#### 字母数字最多 12 个字符
任何包含在 [a-z][A-Z][0-9] 中的字符都是合法的，可以由 5 到 12 个字符组成。

### 控制谁可以持有发行的资产
默认情况下，任何人都可以通过对 asset issuer 进行授信来接受资产。但是，作为锚点，您可以通过在 issuer account 上启用以下标记(flag)来**显式授权**和**撤消**用户对资产的访问权限。

* `AUTHORIZATION REQUIRED`: 设置了这个标识的话，任何想要持有该资产的用户必须经过锚点的批准。锚点需要通过使用 [Allow Trust](list-of-operations#allow-trust) 操作将用户的 Truseline 中的  `Authorize` 标识设置为 `true` 来允许用户持有资产。
* `AUTHORIZATION REVOCABLE`: 设置了这个标识的话，锚点可以通过使用 [Allow Trust](list-of-operations#allow-trust) 操作将用户的 Truseline 中的 `Authorize` 标识设置为 `false` 来冻结他持有的资产。当用户的资产被冻结之后，该用户无法将资产发送到任何其他账户，甚至不能发送到锚点。此设置允许发行账户撤销其意外发行或以不正当方式获取的资产。要使用此设置，还必须启用 `AUTHORIZATION REQUIRED`。

**启用了 `AUTHORIZATION REQUIRED` 和 `AUTHORIZATION REVOCABLE` 的示例流程：**
1. 用户认为自己可以接受某种资产
2. 用户使用此资产的发行账户设置一条 Trustline
3. 发行方授权用户的 Trustline
4. 用户可以接受资产并将其发送给与其它拥有被授权的 Trustline 用户
5. 发行方希望冻结用户对资产的访问权限
6. 发行方取消了对用户 Trustline 的授权
7. 用户无法发送或接受此资产

**另一种流程：** 您不必一开始便设置这些标识。也许您一开始允许任何人都可以对资产授信，但后来意识到这不是一个好主意。在发行了这个资产之后，您依旧可以设置上面两个标志。此时，具有该 Trustline 的每个用户都保留其授权状态，但是您现在可以撤销信任(假设您没有调整主密钥权重或[帐户阈值(account thresholds)](multisignature#thresholds))。

**注意：** 当锚点发行资产时，他们通常希望限制流通中的资产供应。由于 [Allow Trust](list-of-operations#allow-trust) 操作是 `low threshold` 而 [Set Options](list-of-operations#set-options) 操作是  `high threshold`，[Payment](list-of-operations#payment) 操作是 `medium threshold`，所以您可以在限制流通中的令牌供应的情况下保持对 Trustline 授权和撤销授权的权利。

**确保持有的人的资产不会被冻结**: 上述功能对于希望控制谁能够持有和交易其资产的 Issuer 非常有用。然而，如果我是一个资产持有者，并且我担心 Issuer 可能冻结我所持有的资产，那该怎么办？为了得到潜在的资产持有者的信任，发行账户可以启用以下标志：

* `AUTHORIZATION IMMUTABLE`: 如果启用了这个标识，那么就再也不能设置任何授权标识，也永远不能删除账户。

## 数额精度和表示形式
在 XDR 结构中，每个资产数额都被编码为一个有符号的 64 位整数(int 64)。一个资产数量单位(最终用户看到的单位)乘以 10,000,000 便是它在 XDR 中的整数。例如，XDR 中的 25,123,456 表示 2.5123456 个资产。通过这种机制，数额可以精确到**小数点后七位**。

最小的非零数额为 `0.0000001`，它在 XDR 表示为 1。最大的数额为 `((2^63)-1)/(10^7)`(即 `922,337,203,685.4775807`)，因为 XDR 中可表示的最大 64 位整数为 `(2^63)-1`。

在 XDR 中，数额以带符号的 int64 的形式储存，且存储为有符号整数，以避免混淆有符号整数和无符号整数而引起的错误。

### Equator 和 Rainbow 客户端库中的相关性
在 Equator 和客户端库（如 js-rainbow-sdk）中，int64 编码的值由它们进行处理，也就是说您无需再进行数值转换。

### 使用 "big number" 库保持精确性
一些编程语言(比如 JavaScript)在处理数字精度方面存在问题。建议使用 "big number" 库，通过它程序可以处理任意精度的十进制数，而不会损失精度。

### 来了解一下 stroop
"stroop" 是 Rainbow 中的最小单位，它代表着一千万分之一：`1/10000000` 或 `0.0000001`。使用 stroop 您可以便捷的表示一些极小的数，stroop 的复数形式是 "stroops"(例如 "100 stroops")。您知道吗？stroop 来源于早期的 Rainbow 团队对 [stroopwafels(荷式松饼)](https://en.wikipedia.org/wiki/Stroopwafel) 的痴迷。
