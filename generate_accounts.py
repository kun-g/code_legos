# pip install hdwallet

from getpass import getpass
from hdwallet import BIP44HDWallet
from hdwallet.cryptocurrencies import EthereumMainnet
from hdwallet.derivations import BIP44Derivation

bip44_hdwallet = BIP44HDWallet(cryptocurrency=EthereumMainnet)

print("输入助记词：")
mne = getpass()

count = input("输入生成数量：")
count = int(count)

bip44_hdwallet.from_mnemonic(mnemonic=mne, language="english")

print("开始生成地址：\n")
for account_index in range(count):
    bip44_derivation = BIP44Derivation(
            cryptocurrency=EthereumMainnet,
            account=0,
            change=False,
            address=account_index
            )
    bip44_hdwallet.clean_derivation()
    bip44_hdwallet.from_path(path=bip44_derivation)

    addr = bip44_hdwallet.address()
    pk   = bip44_hdwallet.private_key()

    print(account_index, addr, pk)


print("\n使用前，确认前3个地址是否一致")


