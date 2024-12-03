'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Delete } from 'lucide-react'
import { postsService } from '@/services/posts.service'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

interface DeletePostModalProps {
  postId: string
  postTitle: string
}

export default function DeletePostModal({
  postId,
  postTitle,
}: DeletePostModalProps) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const mutation = useMutation({
    mutationFn: postsService.deletePost,
    onError: () => {
      toast.error('Помилка видалення поста')
    },
    onSuccess: () => {
      toast.success('Пост успішно видалено')
      setIsOpen(false)
      router.push('/posts')
    },
  })

  const handleConfirm = () => {
    mutation.mutate(postId)
  }

  const handleCancel = () => {
    setIsOpen(false)
  }

  return (
    <>
      <Button
        className='mt-4'
        variant='destructive'
        onClick={() => setIsOpen(true)}
      >
        <Delete size={16} className='mr-2' />
        Видалити пост
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ви впевнені, що хочете видалити цей пост?</DialogTitle>
            <DialogDescription>
              Ви збираєтесь видалити пост "{postTitle}". Ця дія є незворотною.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant='outline' onClick={handleCancel}>
              Скасувати
            </Button>
            <Button variant='destructive' onClick={handleConfirm}>
              Так, видалити
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
