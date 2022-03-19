# Code Legos For On-Chain Activities

## 批量转账合约
* ABI: abis/BatchTransfer.json
* Mubai: 0xa1cB7F2e960b0792f01980685d09C1D857EB62e7

### transferETH - 批量分发GAS
* 功能：给多个地址发gas(ETH/BNB/Matic...)
* 原型：transferETH (address payable[] memory to, uint amount)
* 参数：
  * to: 接收方地址列表
  * amount: 每个地址分发的数量
  * transaction.value: 要大于to.length * amount，大于的部分会作为小费放在合约里

### transferToken - 批量分发ERC20 Token
* 功能：批量分发ERC20 Token
* 原型：transferToken (IERC20 token, uint amount, address[] memory to)
* 参数：
  * token: ERC20 Token address
  * amount: 每个地址分发的数量
  * to: 接收方地址列表
  * transaction.value: 小费

### transferNFT - 批量分发NFT
* 功能：批量分发ERC721 Token
* 原型：
  * transferNFT (IERC721 token, uint256[] memory ids, address to)
  * transferNFT (IERC721 token, uint256[] memory ids, address[] memory to)
* 参数：
  * token: ERC721 Token address
  * ids: ERC721 Token ID
  * to: 接收方地址
  * transaction.value: 小费
* 说明：
  * 这个接口有两个版本:
    * 版本1是将指定ID的NFT发给目标地址
    * 版本2是一对一的将指定ID的NFT发给目标地址（每个ID对应一个地址）

### 批量查询
* 功能：批量查询，节约程序执行时间
* 原型：
  * queryToken (IERC20 token, address[] memory from) public view returns(uint256[] memory)
  * queryETH (address[] memory from) public view returns(uint256[] memory)

