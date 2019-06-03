# 通货膨胀

Rainbow 网络拥有[通货膨胀](#inflation)机制. 新的 waterdrop 会以每年 1% 的速率添加到网络中, 通胀协议会将这些新 waterdrop 分发给网络中得到了超过 0.05% 的用户投票的账户。

## 通胀投票如何运作
每个账户都可以通过 [set options](list-of-operations#set-options) 操作来设定一个**通胀目标(inflation destination)**, 这个通胀目标会收到通胀所产生的新 waterdrop。除非您再次更新它，否则它会一直存在于您的账户中。

票数根据投票账户持有的 waterdrop 数加权计算。举例来说，如果账户 A 拥有 120 waterdrop，然后他将账户 B 设置为通胀目标，那么账户 B 就收到了 120 张投票。

新 waterdrop 的分发每周执行一次。任何人都可以向网络提交 [inflation](list-of-operations#inflation) 操作。如果距网络开始运行的时间尚未过去一周，那么这个操作将会失败。

每次通货膨胀运行时，自上一轮投票以来用于支付[交易费](fees#transaction-fee)的 waterdrop 也包含在分发的总 waterdrop 中。

当执行通胀时，节点会执行以下算法：

 1. 通过 (存在的 waterdrop 数量) * (每周的通货膨胀率) + 费用池 计算出 `通货膨胀资金池(inflation pool)`。
 2. 通过 (存在的 waterdrop 数量) * 0.0005 计算出 `MIN_VOTE`。只有得到票数超过了 `MIN_VOTE` 的账户才能从通货膨胀资金池中获得 waterdrop。
 3. 根据每个账户设定的**通货膨胀目标**，计算每个账户得到的票数。
 4. 那些得到票数超过 `MIN_VOTE` 的账户为胜出者。
 5. 胜出者将会收到通胀分发的 waterdrop，但是，如果该账户本可以收到的新 waterdrop 大于它的购买负债，那么超出的部分将会返还到费用池中。例如，如果胜出者获得 2％ 的选票，且该账户满足上述条件，那么它将获得通胀池中 2％ 的 waterdrop。
 6. 将未分配 waterdrop 返还到费用池中。