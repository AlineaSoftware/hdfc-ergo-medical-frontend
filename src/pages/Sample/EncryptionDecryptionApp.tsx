import React, { useState } from 'react'
import CryptoJS from 'crypto-js'
import { cleanString } from '@mui/x-date-pickers/internals/hooks/useField/useField.utils'

const EncryptionDecryptionApp: React.FC = () => {
  // State for storing user input and results
  const [idToEncrypt, setIdToEncrypt] = useState<string>('')
  const [encryptedId, setEncryptedId] = useState<string>('')
  const [decryptedId, setDecryptedId] = useState<string>('')
  const [salt, setSalt] = useState<string>('N1PCdw3M2B1TfJhoaY2mL736p2vCUc47') // A fixed salt for simplicity

  //   Encryption function
  //   const encryptText = (data: string) => {
  //     const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), salt,{
  //         format:CipherFormat.OpenSSL
  //     }).toString()
  //     return ciphertext
  //   }

  const encryptPassword = (password, secretKey) => {
    const iv = CryptoJS.lib.WordArray.random(16)

    const encrypted = CryptoJS.AES.encrypt(password, CryptoJS.enc.Utf8.parse(secretKey), {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    })

    const encryptedString = iv.concat(encrypted.ciphertext).toString(CryptoJS.enc.Base64)

    return encryptedString
  }

  // Decryption function
  const decryptData = (ciphertext) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, salt)
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
    return decryptedData
  }

  // Handler for encrypting text
  const handleEncrypt = () => {
    const encrypted = encryptPassword(idToEncrypt, salt)
    setEncryptedId(encrypted)
  }

  // Handler for decrypting text
  const handleDecrypt = () => {
    debugger
    const decrypted = decryptData(encryptedId)
    console.log('decrypted', decrypted)
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Encryption and Decryption with Salt</h2>
      <div>
        <h4>ID to Encrypt</h4>
        <input
          type='text'
          value={idToEncrypt}
          onChange={(e) => setIdToEncrypt(e.target.value)}
          placeholder='Enter ID to encrypt'
        />
        <br />
        <button onClick={handleEncrypt}>Encrypt</button>
      </div>

      <div>
        <h4>Encrypted ID</h4>
        <textarea
          value={encryptedId}
          readOnly
          placeholder='Encrypted ID will appear here'
          rows={4}
          cols={50}
        />
      </div>

      <div>
        <button onClick={handleDecrypt}>Decrypt</button>
      </div>

      <div>
        <h4>Decrypted ID</h4>
        <textarea
          value={decryptedId}
          readOnly
          placeholder='Decrypted ID will appear here'
          rows={4}
          cols={50}
        />
      </div>
      <div>
        <h4>Salt (Key & IV)</h4>
        <input
          type='text'
          value={salt}
          onChange={(e) => setSalt(e.target.value)}
          placeholder='Enter salt to use for encryption'
        />
      </div>
    </div>
  )
}

export default EncryptionDecryptionApp
