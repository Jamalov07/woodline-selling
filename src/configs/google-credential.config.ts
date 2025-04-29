import { registerAs } from '@nestjs/config'
import { GoogleCredentialOptions } from '@common'

export const googleCredentialConfig = registerAs('google-credential', (): GoogleCredentialOptions => {
	const credentials = process.env.GOOGLE_CREDENTIALS ? JSON.parse(process.env.GOOGLE_CREDENTIALS) : {}

	return {
		type: credentials?.type,
		auth_uri: credentials?.auth_uri,
		token_uri: credentials?.token_uri,
		client_id: credentials?.client_id,
		project_id: credentials?.project_id,
		private_key: credentials?.private_key,
		client_email: credentials?.client_email,
		private_key_id: credentials?.private_key_id,
		client_x509_cert_url: credentials?.client_x509_cert_url,
		auth_provider_x509_cert_url: credentials.auth_provider_x509_cert_url,
	}
})
