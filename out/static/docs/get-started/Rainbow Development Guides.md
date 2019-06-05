# 创建账户

在 Rainbow 网络中，您首先需要做的是创建一个账户。 您所有的资产都将存在于这个账户中，您可以通过该账户发送和接收资产——实际上，Rainbow 网络中几乎所有的东西都和账户有关。

每个 Rainbow 账户都有一个**公钥**和一个**私密种子**。Rainbow 通过使用公钥加密（也称非对称加密）来确保每项事务的安全性。公钥可以进行安全共享——其他人需要通过它来识别您的账户并验证您是否授权了某项事务。私密种子可以证明您拥有某个账户，所以建议您永远别与任何人分享私密种子。 举例来说，如果说一个账户是一把锁的话，那么私密种子就是打开它的钥匙。同样的道理，任何知道您账户私密种子的人都能够控制您的账户。

如果您熟悉公钥加密技术的话，可能会想知道私密种子与私钥有何不同。 私密种子实际上是为您的账户生成公钥和私钥而服务的唯一秘密数据。 因此为了方便起见，Rainbow 使用的是私密种子而不是私钥：要获得对账户的完全控制权，只需提供私密种子而不需要同时提供公钥和私钥。

创建账户的第一步是创建自己的种子和密钥——因为种子需要保密，所以当您最终创建账户时，您只需将公钥发送到 Rainbow 服务器。 您可以使用以下命令来生成种子和公钥：

<details>

### 生成密钥对-js
```rainbow
创建一个全新且独一无二的密钥对。
通过以下链接了解 KeyPair 对象：https://rainbow.github.io/js-rainbow-sdk/Keypair.html
const pair = RainbowSdk.Keypair.random();

pair.secret();
SAV76USXIJOBMEQXPANUOQM6F5LIOTLPDIDVRJBFFE2MDJXG24TAPUU7
pair.publicKey();
GCFXHS4GXL6BVUCXBWXGTITROWLVYXQKQLF4YH5O5JT3YZXCYPAFBJZB
```

</details>

<details>

### 生成密钥对-java

```rainbow
创建一个全新且独一无二的密钥对。
通过以下链接了解 KeyPair 对象：https://rainbow.github.io/java-rainbow-sdk/org/rainbow/sdk/KeyPair.html
import org.rainbow.sdk.KeyPair;
KeyPair pair = KeyPair.random();

System.out.println(new String(pair.getSecretSeed()));
SAV76USXIJOBMEQXPANUOQM6F5LIOTLPDIDVRJBFFE2MDJXG24TAPUU7
System.out.println(pair.getAccountId());
GCFXHS4GXL6BVUCXBWXGTITROWLVYXQKQLF4YH5O5JT3YZXCYPAFBJZB
```

</details>

<details>

### 生成密钥对-go

```rainbow
package main

import (
	"log"

	"github.com/rainbow/go/keypair"
)

func main() {
	pair, err := keypair.Random()
	if err != nil {
		log.Fatal(err)
	}

	log.Println(pair.Seed())
	// SAV76USXIJOBMEQXPANUOQM6F5LIOTLPDIDVRJBFFE2MDJXG24TAPUU7
	log.Println(pair.Address())
	// GCFXHS4GXL6BVUCXBWXGTITROWLVYXQKQLF4YH5O5JT3YZXCYPAFBJZB
}
```
</details>


> 现在有了种子和公钥，接下来就可以创建账户。 为了防止人们创建大量无用的账户，每个账户必须最少持有 1 waterdrop(waterdrop 是 Rainbow 网络的内置货币)。
> 由于您还没有 waterdrop，因此您无法支付创建账户所需的费用。 在现实世界中，您可以通过交易所购买一些 waterdrop 来创建您的新账户。
> 但在 Rainbow 的测试网络中，您可以通过使用 Friendbot 来为您创建账户。

如果想创建测试账户的话，请将您创建的公钥发送给 Friendbot，它将公钥作为账户 ID 来创建一个新账户，并为其提供一笔资金。

<code-example name="创建一个测试账户">

```js
// 该 SDK 无法帮助您在测试网络中创建账户，所以您需要自己发起 HTTP 请求。
// 如果您正在使用Node，请安装 `node-fetch` 库并打开下列注释:
// const fetch = require('node-fetch');
try {
  const response = await fetch(
    `https://friendbot.rainbow.org?addr=${encodeURIComponent(pair.publicKey())}`
  );
  const responseJSON = await response.json();
  console.log("SUCCESS! You have a new account :)\n", responseJSON);
} catch (e) {
  console.error("ERROR!", e);
}
```

```java
// 该 SDK 无法帮助您在测试网络中创建账户，所以您需要自己发起 HTTP 请求。
import java.net.*;
import java.io.*;
import java.util.*;

String friendbotUrl = String.format(
  "https://friendbot.rainbow.org/?addr=%s",
  pair.getAccountId());
InputStream response = new URL(friendbotUrl).openStream();
String body = new Scanner(response, "UTF-8").useDelimiter("\\A").next();
System.out.println("SUCCESS! You have a new account :)\n" + body);
```

```go
package main

import (
	"net/http"
	"io/ioutil"
	"log"
	"fmt"
)

func main() {
	// pair 是您之前创建的 keypair 实例
	address := pair.Address()
	resp, err := http.Get("https://friendbot.rainbow.org/?addr=" + address)
	if err != nil {
		log.Fatal(err)
	}

	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(string(body))
}
```

</code-example>

现在是最后一步: 获取账户的详细信息并检查其余额。 账户可以有多种余额——每种货币各有一种余额。

<code-example name="获取账户详情">

```js
const server = new RainbowSdk.Server("https://equator-testnet.rainbow.org");

// JS SDK 使用 Promise 来处理大部分操作，比如检索一个账户
const account = await server.loadAccount(pair.publicKey());
console.log("Balances for account: " + pair.publicKey());
account.balances.forEach(function(balance) {
  console.log("Type:", balance.asset_type, ", Balance:", balance.balance);
});
```

```java
import org.rainbow.sdk.Server;
import org.rainbow.sdk.responses.AccountResponse;

Server server = new Server("https://equator-testnet.rainbow.org");
AccountResponse account = server.accounts().account(pair);
System.out.println("Balances for account " + pair.getAccountId());
for (AccountResponse.Balance balance : account.getBalances()) {
  System.out.println(String.format(
    "Type: %s, Code: %s, Balance: %s",
    balance.getAssetType(),
    balance.getAssetCode(),
    balance.getBalance()));
}
```

```go
package main

import (
	"fmt"
	"log"

	"github.com/rainbow/go/clients/equator"
)

func main() {
	account, err := equator.DefaultTestNetClient.LoadAccount(pair.Address())
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Balances for account:", pair.Address())

	for _, balance := range account.Balances {
		log.Println(balance)
	}
}
```

</code-example>

现在您已经有了一个账户，您可以[开始收款与付款](send-and-receive-money)。
