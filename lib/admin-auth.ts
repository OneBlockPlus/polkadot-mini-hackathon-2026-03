import { NextRequest } from 'next/server';

/**
 * 验证请求是否来自管理员
 * @param req Next.js 请求对象
 * @returns 验证结果，包含是否有效和可能的错误信息
 */
export async function validateAdmin(req: NextRequest): Promise<{ isValid: boolean; error?: { message: string } }> {
  try {
    // 获取环境变量中的管理员地址
    const adminAddress = process.env.NEXT_PUBLIC_ADMIN_ADDRESS;
    
    if (!adminAddress) {
      console.error('Admin address not configured in environment variables');
      return {
        isValid: false,
        error: { message: "服务器配置错误" }
      };
    }

    // 从请求中获取钱包地址
    // 这里假设前端会在请求头中发送钱包地址
    const walletAddress = req.headers.get('x-wallet-address');
    
    if (!walletAddress) {
      return {
        isValid: false,
        error: { message: "没有权限修改" }
      };
    }

    // 比较地址（不区分大小写）
    const normalizedAdminAddress = adminAddress.toLowerCase();
    const normalizedWalletAddress = walletAddress.toLowerCase();
    
    if (normalizedWalletAddress !== normalizedAdminAddress) {
      return {
        isValid: false,
        error: { message: "没有权限修改" }
      };
    }

    return { isValid: true };
  } catch (error) {
    console.error('Error validating admin:', error);
    return {
      isValid: false,
      error: { message: "验证失败" }
    };
  }
}