import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button } from '@mui/material'

export function ModalDialog({ open, title, children, onClose, onConfirm, confirmText = 'Confirm', cancelText = 'Cancel', showCancel = true, disableConfirm = false }) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>
        {typeof children === 'string' ? <Typography>{children}</Typography> : children}
      </DialogContent>
      <DialogActions>
        {showCancel && (
          <Button onClick={onClose} color='inherit'>
            {cancelText}
          </Button>
        )}
        <Button onClick={onConfirm} disabled={disableConfirm} variant='contained' color='primary'>
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
