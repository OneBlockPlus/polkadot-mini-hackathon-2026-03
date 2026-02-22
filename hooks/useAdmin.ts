'use client';

import { useMemo } from 'react';
import { useWallet } from '../contexts/WalletContext';

export const useAdmin = () => {
  const { wallet } = useWallet();
  
  const isAdmin = useMemo(() => {
    if (!wallet?.address) return false;
    
    const adminAddress = process.env.NEXT_PUBLIC_ADMIN_ADDRESS || process.env.ADMIN_ADDRESS;
    if (!adminAddress) return false;
    
    // 比较地址时不区分大小写
    return wallet.address.toLowerCase() === adminAddress.toLowerCase();
  }, [wallet?.address]);
  
  return { isAdmin };
};