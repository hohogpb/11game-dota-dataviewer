import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Box,
  LoadingOverlay,
} from '@mantine/core';
import classes from './login.module.css';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
      remeberMe: true,
    },

    validate: {
      username: (value: string) => (value.length < 1 ? '账号不得为空' : null),
      password: (value: string) => (value.length < 1 ? '密码不得为空' : null),
    },
  });

  async function onSubmit(values: any) {
    try {
      setLoading(true);
      console.log(values);
      const ret = await window.electron.invoke('login', values);
      console.log('on submit ret:', ret);
      navigate('/home');
    } catch (error: any) {
      notifications.show({
        color: 'red',
        title: '登录失败',
        message: error.message,
        withBorder: true,
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function loadLoginInfo() {
      const loginInfo = await window.electron.invoke('getLoginInfo');
      if (!loginInfo) return;

      console.log('login get login info', loginInfo);
      if (loginInfo.remeberMe) {
        form.setValues({
          username: loginInfo.username,
          password: loginInfo.password,
        });
      }
    }

    loadLoginInfo();
  }, []);

  return (
    <Container size={420} py={100}>
      <Box pos="relative">
        <LoadingOverlay
          visible={loading}
          zIndex={1000}
          overlayProps={{ radius: 'sm', blur: 2 }}
        />

        <Title ta="center" className={classes.title}>
          请登录!
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          还没有账号?{' '}
          <Anchor size="sm" component="button">
            创建账号
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={form.onSubmit(onSubmit)}>
            <TextInput
              label="账号"
              placeholder="请输入您的11游戏账号"
              {...form.getInputProps('username')}
              required
            />
            <PasswordInput
              label="密码"
              placeholder="请输入您的密码"
              required
              mt="md"
              {...form.getInputProps('password')}
            />
            <Group justify="space-between" mt="lg">
              <Checkbox
                label="记住我"
                {...form.getInputProps('remeberMe', { type: 'checkbox' })}
              />
              <Anchor component="button" size="sm">
                忘记密码?
              </Anchor>
            </Group>
            <Button fullWidth mt="xl" type="submit">
              登 录
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}
